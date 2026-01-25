import { ReviewList } from '@/app/movie/[id]/review/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đánh giá'
};

export default function ReviewListPage() {
  return <ReviewList queryKey={queryKeys.REVIEW} />;
}
