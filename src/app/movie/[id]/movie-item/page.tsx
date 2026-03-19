import { MovieItemSeasonList } from '@/app/movie/[id]/movie-item/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phần'
};

export default function MovieItemListPage() {
  return <MovieItemSeasonList queryKey={queryKeys.MOVIE_ITEM} />;
}
