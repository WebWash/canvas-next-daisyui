export const NAV_LINKS = [
  { id: 'home', label: 'Home', url: '/' },
  { id: 'pricing', label: 'Pricing', url: '/pricing' },
  {
    id: 'components',
    label: 'Components',
    url: '/components/actions',
    children: [
      { id: 'actions', label: 'Actions', url: '/components/actions' },
      {
        id: 'data-display',
        label: 'Data display',
        url: '/components/data-display',
      },
      { id: 'navigation', label: 'Navigation', url: '/components/navigation' },
      { id: 'feedback', label: 'Feedback', url: '/components/feedback' },
      { id: 'data-input', label: 'Data input', url: '/components/data-input' },
      { id: 'layout', label: 'Layout', url: '/components/layout' },
      { id: 'mockups', label: 'Mockups', url: '/components/mockups' },
    ],
  },
  { id: 'style-guide', label: 'Style guide', url: '/style-guide' },
  { id: 'contact', label: 'Contact', url: '/contact' },
];

export const FOOTER_COLUMNS = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { id: 'home', label: 'Home', url: '/' },
      { id: 'pricing', label: 'Pricing', url: '/pricing' },
      { id: 'contact', label: 'Contact', url: '/contact' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    links: [
      { id: 'style-guide', label: 'Style guide', url: '/style-guide' },
      { id: 'components', label: 'Components', url: '/components/actions' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
];
