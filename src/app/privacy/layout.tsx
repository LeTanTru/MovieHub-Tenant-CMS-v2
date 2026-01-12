import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chính sách'
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
