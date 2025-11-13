import { audienceSearchSchema } from '@/schemaValidations';
import { BaseSearchType } from '@/types/search.type';
import z from 'zod';

export type AudienceResType = {
  id: string;
  avatarPath: string;
  status: number;
  kind: number;
  email: string;
  fullName: string;
  gender: number;
  phone: string;
};

export type AudienceSearchType = z.infer<typeof audienceSearchSchema> &
  BaseSearchType;
