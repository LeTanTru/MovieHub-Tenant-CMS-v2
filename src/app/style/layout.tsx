import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function StyleLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
