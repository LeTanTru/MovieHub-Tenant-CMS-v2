'use client';

import { useEffect } from 'react';
import { useSocketStore } from '@/store';
import { logger } from '@/logger';

const useSocketEvent = (
  cmd: string,
  subCmd: string,
  callback: (data: any) => void
) => {
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data: {
          cmd: string;
          data: { cmd: string; data: any };
          app: string;
        } = JSON.parse(event.data);
        if (data.cmd === cmd) {
          const body: { cmd: string; data: any } = data.data;
          if (body.cmd === subCmd) {
            callback(body.data);
          }
        }
      } catch (err: any) {
        logger.error('Error while handle message:', err);
        logger.info('Invalid socket message:', event.data);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [callback, cmd, socket, subCmd]);
};

export default useSocketEvent;
