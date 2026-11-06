import { cva } from 'class-variance-authority';
import { cn } from 'drupal-canvas';

const itemVariants = cva('join-item btn', {
  variants: {
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
  },
});

/** The first page, the last page and the pages around the current one. */
const visiblePages = (current, total) => {
  const pages = [];
  for (let page = 1; page <= total; page += 1) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== 'gap') {
      pages.push('gap');
    }
  }
  return pages;
};

const Pagination = ({ currentPage, totalPages, baseLink, size, className }) => {
  const item = itemVariants({ size });

  return (
    <nav aria-label="Pagination" className={cn('join max-w-full overflow-x-auto', className)}>
      {visiblePages(Number(currentPage), Number(totalPages)).map((page, index) =>
        page === 'gap' ? (
          <span key={`gap-${index}`} className={cn(item, 'btn-disabled')}>
            …
          </span>
        ) : (
          <a
            key={page}
            href={`${baseLink}?page=${page}`}
            aria-current={page === Number(currentPage) ? 'page' : undefined}
            className={cn(item, page === Number(currentPage) && 'btn-active')}
          >
            {page}
          </a>
        ),
      )}
    </nav>
  );
};

export default Pagination;
