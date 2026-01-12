import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function AppVersionLayout({
  children
}: {
  children: ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
