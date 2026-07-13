import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  replace?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
};

/**
 * Vite remotes cannot use the real Next.js Link (needs App Router + process.env).
 * This shim keeps shared pages working in standalone MFE / federation builds.
 */
export default function Link({ href, children, replace, onClick, ...props }: NextLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || props.target === "_blank") return;

    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModified || event.button !== 0) return;

    event.preventDefault();
    if (replace) {
      window.location.replace(href);
    } else {
      window.location.assign(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
