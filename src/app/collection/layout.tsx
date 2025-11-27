import { SidebarLayout } from '@/components/layout';

export default function CollectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
