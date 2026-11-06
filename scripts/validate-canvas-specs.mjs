#!/usr/bin/env node
/**
 * Validates Canvas page, template and mock JSON, and component metadata.
 *
 * The Workbench schemas leave `props` unconstrained, so they don't catch unknown
 * components, undeclared props or dangling slot references. This script checks
 * the schemas first, then those semantic rules against each component.yml.
 *
 * Usage: node scripts/validate-canvas-specs.mjs [--root <dir>]
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { Ajv } from 'ajv';
import addFormatsModule from 'ajv-formats';
import { parse as parseYaml } from 'yaml';

const addFormats = addFormatsModule.default ?? addFormatsModule;

const rootArgIndex = process.argv.indexOf('--root');
const ROOT = resolve(
  rootArgIndex === -1 ? process.cwd() : process.argv[rootArgIndex + 1],
);
const PROJECT = resolve(new URL('..', import.meta.url).pathname);
const SCHEMA_DIR = join(
  PROJECT,
  'node_modules/@drupal-canvas/workbench/dist/client/src/lib/schemas',
);

const MARKER = 'marker.page_content';
/** Implementation-only props from spec section 7, allowed in mocks only. */
const MOCK_ONLY_PROPS = {
  navbar: new Set(['links']),
  footer: new Set(['columns', 'socialLinks']),
};

const errors = [];
const report = (file, message) =>
  errors.push(`${relative(ROOT, file)}: ${message}`);

const readJson = (file) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    report(file, `invalid JSON: ${error.message}`);
    return null;
  }
};

const jsonFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((name) => name.endsWith('.json'))
        .sort()
        .map((name) => join(dir, name))
    : [];

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const compile = (name) =>
  ajv.compile(JSON.parse(readFileSync(join(SCHEMA_DIR, name), 'utf8')));
const pageSchema = compile('page-spec.schema.json');
const templateSchema = compile('page-template-spec.schema.json');
const mocksSchema = compile('component-mocks.schema.json');

const checkSchema = (validate, data, file) => {
  if (!validate(data)) {
    for (const error of validate.errors) {
      report(file, `schema ${error.instancePath || '/'} ${error.message}`);
    }
    return false;
  }
  return true;
};

// Components ------------------------------------------------------------------

const componentsDir = join(ROOT, 'components');
const components = new Map();

for (const name of readdirSync(componentsDir).sort()) {
  const dir = join(componentsDir, name);
  if (!statSync(dir).isDirectory()) {
    continue;
  }
  const yamlPath = join(dir, 'component.yml');
  const indexPath = join(dir, 'index.jsx');

  if (!existsSync(yamlPath)) {
    report(dir, 'missing component.yml');
    continue;
  }
  if (!existsSync(indexPath)) {
    report(dir, 'missing index.jsx');
  } else if (!/export\s+default\b/.test(readFileSync(indexPath, 'utf8'))) {
    report(indexPath, 'no default export (ESLint does not check this)');
  }
  if (!existsSync(join(dir, 'mocks.json'))) {
    report(dir, 'missing mocks.json');
  }

  let meta;
  try {
    meta = parseYaml(readFileSync(yamlPath, 'utf8'));
  } catch (error) {
    report(yamlPath, `invalid YAML: ${error.message}`);
    continue;
  }

  if (meta.machineName !== name) {
    report(yamlPath, `machineName "${meta.machineName}" is not "${name}"`);
  }
  if (meta.status !== true) {
    report(yamlPath, 'status must be true');
  }

  const props = meta.props?.properties ?? {};
  for (const [id, def] of Object.entries(props)) {
    if (def.enum) {
      for (const value of def.enum) {
        if (String(value).includes('.')) {
          report(yamlPath, `${id}: enum value "${value}" contains a dot`);
        }
        if (!(value in (def['meta:enum'] ?? {}))) {
          report(yamlPath, `${id}: enum value "${value}" has no meta:enum`);
        }
      }
      for (const example of def.examples ?? []) {
        if (!def.enum.includes(example)) {
          report(yamlPath, `${id}: example "${example}" is not in the enum`);
        }
      }
    }
  }
  for (const id of meta.required ?? []) {
    if (!props[id]) {
      report(yamlPath, `required prop "${id}" is not declared`);
    } else if (!props[id].examples?.length) {
      report(yamlPath, `required prop "${id}" has no example`);
    }
  }

  components.set(name, {
    props,
    required: meta.required ?? [],
    slots: Object.keys(meta.slots ?? {}),
  });
}

// Imports ---------------------------------------------------------------------

/**
 * Lint and tsc don't check named imports in JSX. A bad one fails at runtime, and
 * Workbench loads components together, so it breaks every mock preview at once.
 */
const declaredExports = (entry) => {
  const source = readFileSync(
    join(PROJECT, 'node_modules/drupal-canvas/dist', entry),
    'utf8',
  );
  const names = new Set();
  for (const [, list] of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of list.split(',')) {
      const name = part.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop();
      if (name) {
        names.add(name);
      }
    }
  }
  return names;
};
const PACKAGE_EXPORTS = {
  'drupal-canvas': declaredExports('index.d.ts'),
  'drupal-canvas/react': declaredExports('react.d.ts'),
};
const sourceFiles = [
  ...[...components.keys()].map((name) => join(componentsDir, name, 'index.jsx')),
  ...readdirSync(join(ROOT, 'lib'))
    .filter((name) => /\.jsx?$/.test(name))
    .map((name) => join(ROOT, 'lib', name)),
].filter((file) => existsSync(file));

for (const file of sourceFiles) {
  const source = readFileSync(file, 'utf8');
  for (const [, list, from] of source.matchAll(
    /import\s*\{([^}]*)\}\s*from\s*'([^']+)'/g,
  )) {
    const declared = PACKAGE_EXPORTS[from];
    if (!declared) {
      continue;
    }
    for (const part of list.split(',')) {
      const name = part.trim().split(/\s+as\s+/)[0];
      if (name && !declared.has(name)) {
        report(file, `"${from}" has no export named "${name}"`);
      }
    }
  }
}

// Elements --------------------------------------------------------------------

const valueError = (value, def) => {
  if (def.$ref) {
    if (value === null || typeof value !== 'object' || !value.src) {
      return 'must be an object with src';
    }
    return null;
  }
  switch (def.type) {
    case 'string':
      if (typeof value !== 'string') return 'must be a string';
      if (def.format === 'uri-reference' && value === '#') {
        return 'link must be a real path, not #';
      }
      break;
    case 'boolean':
      if (typeof value !== 'boolean') return 'must be a boolean';
      break;
    case 'integer':
      if (!Number.isInteger(value)) return 'must be an integer';
      break;
    case 'number':
      if (typeof value !== 'number') return 'must be a number';
      break;
    case 'array':
      if (!Array.isArray(value)) return 'must be an array';
      if (
        def.items?.type === 'string' &&
        value.some((item) => typeof item !== 'string')
      ) {
        return 'must be an array of strings';
      }
      break;
    case 'object':
      if (value === null || typeof value !== 'object') {
        return 'must be an object';
      }
      break;
    default:
      break;
  }
  if (def.enum && !def.enum.includes(value)) {
    return `"${value}" is not one of ${def.enum.join(', ')}`;
  }
  return null;
};

const checkProps = (file, label, type, props, slots, { inMock }) => {
  const component = components.get(type);
  if (!component) {
    return;
  }
  const given = props ?? {};
  const exempt = inMock ? MOCK_ONLY_PROPS[type] : undefined;
  for (const [id, value] of Object.entries(given)) {
    if (exempt?.has(id)) {
      continue;
    }
    const def = component.props[id];
    if (!def) {
      report(file, `${label}: undeclared prop "${id}" on ${type}`);
      continue;
    }
    const problem = valueError(value, def);
    if (problem) {
      report(file, `${label}: prop "${id}" on ${type} ${problem}`);
    }
  }
  for (const id of component.required) {
    if (given[id] === undefined || given[id] === '') {
      report(file, `${label}: ${type} is missing required prop "${id}"`);
    }
  }
  for (const slot of Object.keys(slots ?? {})) {
    if (!component.slots.includes(slot)) {
      report(file, `${label}: undeclared slot "${slot}" on ${type}`);
    }
  }
};

/**
 * Checks one set of elements. Returns the IDs that were referenced from a slot.
 * `prefix` is `js.` for pages and templates and empty for mocks.
 */
const checkElements = (file, label, elements, { prefix, inMock, rootSlots }) => {
  const referenced = new Set();
  const refer = (owner, slot, id) => {
    if (!(id in elements)) {
      report(file, `${label}: ${owner} slot "${slot}" references missing "${id}"`);
    }
    if (referenced.has(id)) {
      report(file, `${label}: element "${id}" is referenced twice`);
    }
    referenced.add(id);
  };

  for (const [slot, ids] of Object.entries(rootSlots ?? {})) {
    for (const id of ids) {
      refer('root', slot, id);
    }
  }

  for (const [id, element] of Object.entries(elements)) {
    const { type } = element;
    if (type === MARKER) {
      if (inMock) {
        report(file, `${label}: ${id} can't use ${MARKER} in a mock`);
      }
      continue;
    }
    if (prefix && !type.startsWith(prefix)) {
      report(file, `${label}: element "${id}" type "${type}" must start ${prefix}`);
    }
    if (!prefix && type.startsWith('js.')) {
      report(file, `${label}: element "${id}" type "${type}" must be bare in mocks`);
    }
    const bare = type.replace(/^js\./, '');
    if (!components.has(bare)) {
      report(file, `${label}: element "${id}" uses unknown component "${type}"`);
      continue;
    }
    checkProps(file, `${label} ${id}`, bare, element.props, element.slots, {
      inMock,
    });
    for (const [slot, ids] of Object.entries(element.slots ?? {})) {
      for (const child of ids) {
        refer(id, slot, child);
      }
    }
  }
  return referenced;
};

// Mocks -----------------------------------------------------------------------

for (const [name, component] of components) {
  const file = join(componentsDir, name, 'mocks.json');
  if (!existsSync(file)) {
    continue;
  }
  const data = readJson(file);
  if (!data || !checkSchema(mocksSchema, data, file)) {
    continue;
  }
  const seen = new Set();
  for (const mock of data.mocks) {
    const label = `mock "${mock.name}"`;
    if (mock.name === 'Default') {
      report(file, `${label}: Workbench already provides a Default tab`);
    }
    if (seen.has(mock.name)) {
      report(file, `${label}: duplicate mock name`);
    }
    seen.add(mock.name);

    const elements = mock.elements ?? {};
    if (mock.root) {
      if (!(mock.root in elements)) {
        report(file, `${label}: root "${mock.root}" is not in elements`);
      }
    } else {
      checkProps(file, label, name, mock.props, mock.slots, { inMock: true });
    }
    const referenced = checkElements(file, label, elements, {
      prefix: '',
      inMock: true,
      rootSlots: mock.slots,
    });
    for (const id of Object.keys(elements)) {
      if (id !== mock.root && !referenced.has(id)) {
        report(file, `${label}: element "${id}" is never rendered`);
      }
    }
  }
  // A required prop with no example would break the built-in Default tab.
  for (const id of component.required) {
    if (!component.props[id]?.examples?.length) {
      report(file, `Default tab: required prop "${id}" has no example`);
    }
  }
}

// Pages -----------------------------------------------------------------------

const paths = new Map();
for (const file of jsonFiles(join(ROOT, 'pages'))) {
  const data = readJson(file);
  if (!data || !checkSchema(pageSchema, data, file)) {
    continue;
  }
  if (typeof data.path !== 'string' || !data.path.startsWith('/')) {
    report(file, `path "${data.path}" must start with /`);
  } else if (paths.has(data.path)) {
    report(file, `path "${data.path}" is also used by ${paths.get(data.path)}`);
  } else {
    paths.set(data.path, relative(ROOT, file));
  }
  if (Object.values(data.elements).some((el) => el.type === MARKER)) {
    report(file, `pages can't use ${MARKER}`);
  }
  checkElements(file, 'page', data.elements, { prefix: 'js.', inMock: false });
}

// Page templates --------------------------------------------------------------

const templates = jsonFiles(join(ROOT, 'page-templates'));
let defaults = 0;
for (const file of templates) {
  if (!/^[a-z0-9_]+\.json$/.test(basename(file))) {
    report(file, 'template filenames must be machine names, a-z, 0-9 and _');
  }
  const data = readJson(file);
  if (!data || !checkSchema(templateSchema, data, file)) {
    continue;
  }
  if (data.default) {
    defaults += 1;
  }
  const markers = Object.values(data.elements).filter(
    (el) => el.type === MARKER,
  ).length;
  if (markers !== 1) {
    report(file, `needs exactly one ${MARKER}, found ${markers}`);
  }
  checkElements(file, 'template', data.elements, {
    prefix: 'js.',
    inMock: false,
  });
}
if (defaults > 1) {
  errors.push(`page-templates: ${defaults} templates set "default": true`);
}

// Result ----------------------------------------------------------------------

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log(
  `OK: ${components.size} components, ${paths.size} pages, ${templates.length} page templates.`,
);
