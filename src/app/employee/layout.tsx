import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
