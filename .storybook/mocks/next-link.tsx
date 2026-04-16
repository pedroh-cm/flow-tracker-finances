import type { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type LinkProps = PropsWithChildren<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    prefetch?: boolean | null;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    locale?: string | false;
  }
>;

export default function Link({ children, href, ...props }: LinkProps): ReactNode {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}