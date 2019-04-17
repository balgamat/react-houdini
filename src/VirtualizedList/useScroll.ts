import { useEffect, useRef } from 'react';

const useScroll = (handler: (e: any) => void) => {
  const savedHandler = useRef((e: any) => {
    return;
  });

  useEffect(
    () => {
      savedHandler.current = handler;
    },
    [handler],
  );

  useEffect(() => {
    const eventListener = (event: UIEvent) => savedHandler!.current!(event);
    window.addEventListener('scroll', eventListener);
    return () => {
      window.removeEventListener('scroll', eventListener);
    };
  }, []);
};

export default useScroll;
