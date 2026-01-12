import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function MovieLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
