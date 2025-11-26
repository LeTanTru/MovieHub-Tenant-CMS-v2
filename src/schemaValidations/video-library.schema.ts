import { VIDEO_LIBRARY_SOURCE_TYPE_EXTERNAL } from '@/constants';
import z from 'zod';

export const videoLibrarySchema = (isRequiredDuration: boolean) =>
  z
    .object({
      content: z.string().nonempty('Bắt buộc'),
      description: z.string().nonempty('Bắt buộc'),
      introEnd: z.union([z.string(), z.number()]).nullable().optional(),
      introStart: z.union([z.string(), z.number()]).nullable().optional(),
      outroStart: z.union([z.string(), z.number()]).nullable().optional(),
      name: z.string().nonempty('Bắt buộc'),
      shortDescription: z.string().nonempty('Bắt buộc'),
      status: z.number({ error: 'Bắt buộc' }),
      thumbnailUrl: z.string().nonempty('Bắt buộc'),
      sourceType: z.number({ error: 'Bắt buộc' }),
      duration: z.union([z.string(), z.number()]).nullable().optional()
    })
    .refine(
      (data) => {
        if (data?.sourceType === VIDEO_LIBRARY_SOURCE_TYPE_EXTERNAL)
          return (
            data.duration !== null &&
            data.duration !== undefined &&
            data.duration !== '' &&
            data.duration !== 0
          );
        return true;
      },
      {
        message: 'Bắt buộc',
        path: ['duration']
      }
    );

export const videoLibrarySearchSchema = z.object({
  name: z.string().optional().nullable(),
  state: z.number().optional().nullable()
});
