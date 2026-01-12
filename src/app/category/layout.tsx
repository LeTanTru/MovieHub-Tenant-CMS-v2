import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
