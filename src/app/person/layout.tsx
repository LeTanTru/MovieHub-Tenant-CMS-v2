import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function PersonLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
