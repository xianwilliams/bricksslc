import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export function ArrowLink({
  href,
  children,
  light = false,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`arrow-link ${light ? 'arrow-link-light' : ''} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}
