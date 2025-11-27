import z from 'zod';

export const collectionItemSchema = z.object({
  collectionId: z.string().nonempty('Bắt buộc'),
  movieId: z.string().nonempty('Bắt buộc'),
  ordering: z.number()
});

export const collectionItemSearchSchema = z.object({
  collectionId: z.string().nonempty('Bắt buộc')
});
