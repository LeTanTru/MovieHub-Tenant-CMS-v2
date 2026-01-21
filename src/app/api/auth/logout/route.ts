import { apiConfig, storageKeys } from '@/constants';
import { ApiResponse } from '@/types';
import {
  http,
  removeAccessTokenFromCookie,
  removeCookieData,
  removeRefreshTokenFromCookie
} from '@/utils';
import { AxiosError, HttpStatusCode } from 'axios';

export async function POST() {
  try {
    const res = await http.post<ApiResponse<any>>(apiConfig.auth.logout);
    if (res.result) {
      removeAccessTokenFromCookie();
      removeRefreshTokenFromCookie();
      removeCookieData(storageKeys.USER_KIND);
    }
    return Response.json(res, { status: HttpStatusCode.Ok });
  } catch (error) {
    if (error instanceof AxiosError)
      return Response.json(error?.response?.data, {
        status: HttpStatusCode.BadRequest
      });
    return Response.json(
      { error },
      {
        status: HttpStatusCode.BadRequest
      }
    );
  }
}
