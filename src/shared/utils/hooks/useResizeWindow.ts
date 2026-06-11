import { useEffect, useState } from 'react';

const useResizeWindow = () => {
  const [viewportWidth, setViewportWidth] = useState(1920);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportWidth;
};

export default useResizeWindow;
