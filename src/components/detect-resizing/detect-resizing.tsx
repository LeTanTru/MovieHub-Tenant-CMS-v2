'use client';

import { useBrowserState } from '@/hooks';

export default function DetectFullscreen() {
  const { isMaximized, isZoomed, zoomLevel } = useBrowserState();

  if (isMaximized && !isZoomed) return null;

  const message = !isMaximized
    ? 'Vui lòng mở trình duyệt toàn màn hình để sử dụng CMS'
    : zoomLevel > 1
      ? 'Vui lòng không phóng to trình duyệt để sử dụng CMS'
      : 'Vui lòng không thu nhỏ trình duyệt để sử dụng CMS';

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-gray-200 text-gray-800'>
      {message}
    </div>
  );
}
