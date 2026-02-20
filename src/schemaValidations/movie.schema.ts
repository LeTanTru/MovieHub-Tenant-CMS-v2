import { z } from 'zod';

export const movieSchema = z.object({
  ageRating: z.number({ error: 'Bắt buộc' }).min(1, 'Bắt buộc'),
  categoryIds: z.array(z.string(), { error: 'Bắt buộc' }).nonempty('Bắt buộc'),
  country: z.string().nonempty('Bắt buộc'),
  description: z.string().nonempty('Bắt buộc'),
  isFeatured: z.boolean(),
  language: z.string().nonempty('Bắt buộc'),
  latestEpisode: z.string().optional().nullable(),
  latestSeason: z.string().optional().nullable(),
  originalTitle: z.string().nonempty('Bắt buộc'),
  posterUrl: z.string().nonempty('Bắt buộc'),
  releaseDate: z.string().nonempty('Bắt buộc'),
  status: z.number({ error: 'Bắt buộc' }),
  thumbnailUrl: z.string().nonempty('Bắt buộc'),
  title: z.string().nonempty('Bắt buộc'),
  type: z.number({ error: 'Bắt buộc' }).min(1, 'Bắt buộc'),
  year: z.number({ error: 'Bắt buộc' })
});

export const movieSearchSchema = z.object({
  ageRating: z.number().optional().nullable(),
  categoryIds: z.array(z.string(), { error: 'Bắt buộc' }).nonempty('Bắt buộc'),
  collectionId: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  excludeIds: z.array(z.string()).optional().nullable(),
  id: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().nullable(),
  keyword: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  originalTitle: z.number().optional().nullable(),
  releaseYear: z.number().optional().nullable(),
  title: z.string().optional().nullable(),
  type: z.number().optional().nullable()
});
