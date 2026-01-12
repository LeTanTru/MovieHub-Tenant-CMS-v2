import { SidebarLayout as SidebarLayoutComponent } from '@/components/layout';
import { ReactNode } from 'react';

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return <SidebarLayoutComponent>{children}</SidebarLayoutComponent>;
}
