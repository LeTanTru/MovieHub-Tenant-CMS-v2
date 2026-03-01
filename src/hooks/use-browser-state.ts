import { useEffect, useRef, useState } from 'react';

const TOLERANCE = 0;

const useBrowserState = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMaximized, setIsMaximized] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const checkMaximized = () => {
      const widthDiff = Math.abs(window.outerWidth - window.screen.availWidth);
      const heightDiff = Math.abs(
        window.outerHeight - window.screen.availHeight
      );
      return widthDiff <= TOLERANCE && heightDiff <= TOLERANCE;
    };

    const handleResize = () => {
      setIsResizing(true);
      setZoomLevel(window.devicePixelRatio);
      setIsMaximized(checkMaximized());

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsResizing(false);
      }, 200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    isResizing,
    zoomLevel,
    isZoomed: zoomLevel !== 1,
    isMaximized,
    isNotMaximized: !isMaximized
  };
};

export default useBrowserState;
