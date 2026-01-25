import { CategoryList } from '@/app/category/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh mục'
};

export default function CategoryListPage() {
  return <CategoryList queryKey={queryKeys.CATEGORY} />;
}
