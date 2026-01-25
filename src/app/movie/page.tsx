import { MovieList } from '@/app/movie/_components';
import { queryKeys } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phim'
};

export default function MovieListPage() {
  return <MovieList queryKey={queryKeys.MOVIE} />;
}
