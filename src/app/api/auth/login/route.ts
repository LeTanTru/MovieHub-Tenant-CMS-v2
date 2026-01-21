import envConfig from '@/config';
import {
  apiConfig,
  LOGIN_TYPE_EMPLOYEE,
  LOGIN_TYPE_MANAGER,
  storageKeys
} from '@/constants';
import { ApiConfig, LoginBodyType, LoginResType } from '@/types';
import {
  http,
  setAccessTokenToCookie,
  setCookieData,
  setRefreshTokenToCookie
} from '@/utils';
import { AxiosError, HttpStatusCode } from 'axios';

export async function POST(request: Request) {
  const body: LoginBodyType = await request.json();

  const api: Record<string, ApiConfig> = {
    [LOGIN_TYPE_EMPLOYEE]: apiConfig.auth.loginEmployee,
    [LOGIN_TYPE_MANAGER]: apiConfig.auth.loginManager
  };

  if (!api[body.loginType])
    return Response.json(
      { message: 'Invalid login type' },
      { status: HttpStatusCode.BadRequest }
    );

  const payload: Omit<LoginBodyType, 'loginType'> = {
    grant_type: body.grant_type,
    password: body.password,
    tenantId: body.tenantId,
    username: body.username
  };

  try {
    const res = await http.post<LoginResType>(apiConfig.auth.loginManager, {
      body: payload,
      options: {
        headers: {
          Authorization: `Basic ${btoa(`${envConfig.NEXT_PUBLIC_APP_USERNAME}:${envConfig.NEXT_PUBLIC_APP_PASSWORD}`)}`
        }
      }
    });
    setAccessTokenToCookie(res.access_token, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    setRefreshTokenToCookie(res.refresh_token, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    setCookieData(storageKeys.USER_KIND, res.user_kind, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
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
