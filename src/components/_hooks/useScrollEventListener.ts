import * as React from 'react';

interface ScrollSettings {
  position: number;
  lastDirection: string | null;
}

const useScrollEventListener : Function = ({
  ref,
}:any) => {
  const [scrollSettings, setScrollSettings] = React.useState<ScrollSettings>({
    position: 0,
    lastDirection: null,
  });
  const updateScrollSettings = React.useCallback(
    (event: any) => {
      setScrollSettings((currentScrollSettings: any) => ({
        position: event.target.scrollTop,
        lastDirection: event.target.scrollTop > currentScrollSettings.position ? 'up' : 'down',
      }));
    },
    [],
  );

  React.useEffect(() => {
    const currentRef = ref.current;
    if (ref && currentRef) {
      currentRef.addEventListener('scroll', updateScrollSettings, false);
    }
    return () => {
      currentRef.removeEventListener('scroll', updateScrollSettings, false);
    };
  }, [updateScrollSettings, ref]);

  return ({ scrollSettings });
};

export default useScrollEventListener;
