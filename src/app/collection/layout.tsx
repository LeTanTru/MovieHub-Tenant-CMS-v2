import { SidebarLayout } from '@/components/layout';
import { ReactNode } from 'react';

export default function CollectionLayout({
  children
}: {
  children: ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
