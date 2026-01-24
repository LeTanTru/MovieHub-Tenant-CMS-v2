'use client';
import envConfig from '@/config';
import {
  ErrorCode,
  KIND_EMPLOYEE,
  KIND_MANAGER,
  socketSendCMDs,
  storageKeys
} from '@/constants';
import { logger } from '@/logger';
import {
  useEmployeeProfileQuery,
  useGetClientTokenMutation,
  useManagerProfileQuery
} from '@/queries';
import { useAppLoadingStore, useAuthStore, useSocketStore } from '@/store';
import { getData, isTokenExpired, removeData } from '@/utils';
import { type ReactNode, useEffect, useState } from 'react';

export default function AppProvider({ children }: { children: ReactNode }) {
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const kind = getData(storageKeys.USER_KIND);
  const [clientToken, setClientToken] = useState<string>('');
  const setLoading = useAppLoadingStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setSocket = useSocketStore((s) => s.setSocket);

  const isValidKind =
    kind && (+kind === KIND_MANAGER || +kind === KIND_EMPLOYEE);
  const shouldFetchProfile = !!accessToken && !!isValidKind;

  const {
    data: managerProfile,
    isLoading: managerProfileLoading,
    isFetching: managerProfileFetching,
    error: manageProfileError
  } = useManagerProfileQuery(shouldFetchProfile && +kind === KIND_MANAGER);
  const {
    data: employeeProfile,
    isLoading: employeeProfileLoading,
    isFetching: employeeProfileFetching,
    error: employeeProfileError
  } = useEmployeeProfileQuery(shouldFetchProfile && +kind === KIND_EMPLOYEE);
  const { mutateAsync: getClientToken } = useGetClientTokenMutation();

  useEffect(() => {
    setLoading(
      managerProfileLoading ||
        managerProfileFetching ||
        employeeProfileLoading ||
        employeeProfileFetching
    );
  }, [
    employeeProfileFetching,
    employeeProfileLoading,
    managerProfileFetching,
    managerProfileLoading,
    setLoading
  ]);

  useEffect(() => {
    if (!managerProfile && !employeeProfile) return;
    const result = managerProfile?.result || employeeProfile?.result;
    const data = managerProfile?.data || employeeProfile?.data;
    if (result && data) {
      setProfile(data);
    } else {
      const code = managerProfile?.code || employeeProfile?.code;
      if (code === ErrorCode.EMPLOYEE_ERROR_NOT_FOUND) {
        removeData(storageKeys.ACCESS_TOKEN);
        removeData(storageKeys.REFRESH_TOKEN);
        removeData(storageKeys.USER_KIND);
      }
    }
  }, [employeeProfile, managerProfile, setProfile]);

  useEffect(() => {
    const error = manageProfileError || employeeProfileError;
    if (!error) return;
    logger.error('Error while fetching profile', error);
  }, [employeeProfileError, manageProfileError]);

  useEffect(() => {
    if (!accessToken || !kind) return;

    if (+kind !== KIND_MANAGER && +kind !== KIND_EMPLOYEE) {
      removeData(storageKeys.ACCESS_TOKEN);
      removeData(storageKeys.REFRESH_TOKEN);
      removeData(storageKeys.USER_KIND);
    }
  }, [accessToken, kind]);

  useEffect(() => {
    if (!accessToken || isTokenExpired(accessToken)) {
      setClientToken('');
      return;
    }

    if (clientToken) return;

    const handleGetClientToken = async () => {
      try {
        const res = await getClientToken({
          appName: envConfig.NEXT_PUBLIC_APP_NAME
        });
        if (res.data?.token) {
          setClientToken(res.data.token);
        }
      } catch (error) {
        logger.error('Error while getting client token', error);
      }
    };

    handleGetClientToken();
  }, [accessToken, clientToken, getClientToken]);

  useEffect(() => {
    if (!clientToken) return;

    const socket = new WebSocket(envConfig.NEXT_PUBLIC_API_SOCKET);
    setSocket(socket);

    let pingInterval: NodeJS.Timeout | null = null;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          cmd: socketSendCMDs.CMD_CLIENT_VERIFY_TOKEN,
          platform: 0,
          clientVersion: '1.0',
          lang: 'vi',
          token: clientToken,
          app: 'CLIENT_APP',
          data: { app: 'CLIENT_APP' }
        })
      );

      pingInterval = setInterval(() => {
        socket.send(
          JSON.stringify({
            cmd: socketSendCMDs.CMD_CLIENT_PING,
            platform: 0,
            clientVersion: '1.0',
            lang: 'vi',
            token: clientToken,
            app: 'CLIENT_APP',
            data: { app: 'CLIENT_APP' }
          })
        );
      }, 30 * 1000);
    };

    socket.onclose = () => {
      if (pingInterval) clearInterval(pingInterval);
    };

    // socket.onmessage = logger.info;

    return () => {
      if (pingInterval) clearInterval(pingInterval);
      socket.close();
    };
  }, [clientToken, setSocket]);

  return <>{children}</>;
}
