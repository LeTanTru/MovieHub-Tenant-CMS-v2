'use client';
import envConfig from '@/config';
import {
  ErrorCode,
  KIND_EMPLOYEE,
  KIND_MANAGER,
  socketSendCMDs,
  storageKeys,
  WEB_PLATFORM
} from '@/constants';
import { logger } from '@/logger';
import { useEmployeeProfileQuery, useManagerProfileQuery } from '@/queries';
import { useAppLoadingStore, useAuthStore, useSocketStore } from '@/store';
import { getData, removeData } from '@/utils';
import { domAnimation, LazyMotion } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';

export default function AppProvider({ children }: { children: ReactNode }) {
  const accessToken = getData(storageKeys.ACCESS_TOKEN);
  const kind = getData(storageKeys.USER_KIND);
  const setLoading = useAppLoadingStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setSocket = useSocketStore((s) => s.setSocket);

  const isValidKind =
    kind && (+kind === KIND_MANAGER || +kind === KIND_EMPLOYEE);
  const shouldFetchProfile = !!accessToken && !!isValidKind;

  const { data: managerProfile, isLoading: managerProfileLoading } =
    useManagerProfileQuery(shouldFetchProfile && +kind === KIND_MANAGER);
  const { data: employeeProfile, isLoading: employeeProfileLoading } =
    useEmployeeProfileQuery(shouldFetchProfile && +kind === KIND_EMPLOYEE);

  useEffect(() => {
    setLoading(managerProfileLoading || employeeProfileLoading);
  }, [employeeProfileLoading, managerProfileLoading, setLoading]);

  useEffect(() => {
    if (!managerProfile && !employeeProfile) return;

    const result = managerProfile?.result || employeeProfile?.result;
    const data = managerProfile?.data || employeeProfile?.data;
    if (result && data) {
      setProfile(data);
    } else {
      const code = managerProfile?.code || employeeProfile?.code;
      if (code === ErrorCode.EMPLOYEE_ERROR_NOT_FOUND) {
        removeData([
          storageKeys.ACCESS_TOKEN,
          storageKeys.REFRESH_TOKEN,
          storageKeys.USER_KIND
        ]);
      }
    }
  }, [employeeProfile, managerProfile, setProfile]);

  useEffect(() => {
    if (!accessToken || !kind) return;

    if (+kind !== KIND_MANAGER && +kind !== KIND_EMPLOYEE) {
      removeData([
        storageKeys.ACCESS_TOKEN,
        storageKeys.REFRESH_TOKEN,
        storageKeys.USER_KIND
      ]);
    }
  }, [accessToken, kind]);

  useEffect(() => {
    if (!accessToken) return;

    const socket = new WebSocket(envConfig.NEXT_PUBLIC_API_SOCKET);
    setSocket(socket);

    let pingInterval: NodeJS.Timeout | null = null;

    socket.onopen = () => {
      if (socket.readyState === WebSocket.OPEN) {
        logger.info('Socket connected');
        socket.send(
          JSON.stringify({
            cmd: socketSendCMDs.CMD_CLIENT_VERIFY_TOKEN,
            platform: WEB_PLATFORM,
            clientVersion: '1.0',
            lang: 'vi',
            token: accessToken,
            app: 'CLIENT_APP',
            data: { app: 'CLIENT_APP' }
          })
        );

        pingInterval = setInterval(() => {
          socket.send(
            JSON.stringify({
              cmd: socketSendCMDs.CMD_CLIENT_PING,
              platform: WEB_PLATFORM,
              clientVersion: '1.0',
              lang: 'vi',
              token: accessToken,
              app: 'CLIENT_APP',
              data: { app: 'CLIENT_APP' }
            })
          );
        }, 30 * 1000);
      }
    };

    socket.onclose = () => {
      if (pingInterval) clearInterval(pingInterval);
    };

    // socket.onmessage = logger.info;

    return () => {
      if (pingInterval) clearInterval(pingInterval);
      socket.close();
    };
  }, [accessToken, setSocket]);

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
