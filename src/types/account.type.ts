export type ProfileResType = {
  id: string;
  status: number;
  kind: number;
  username: string;
  phone: string;
  email: string;
  fullName: string;
  avatarPath: string;
  group: { id: string; name: string; kind: number };
};
