import React, {useCallback, useEffect, useRef} from "react";

interface Props {
  onTriggered: (e: Event) => void;
  disableClick?: boolean;
  disableTouch?: boolean;
  disableKeys?: boolean;
  allowAnyKey?: boolean;
  triggerKeys?: string[];
}

export function useDetectClickOutside(
  {
    onTriggered,
    disableClick = false,
    disableTouch = false,
    disableKeys = false,
    allowAnyKey = false,
    triggerKeys = [],
  }: Props
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const handleKeyEvent = useCallback((e: KeyboardEvent) => {
    if (allowAnyKey || triggerKeys.includes(e.key) || e.key === 'Escape') {
      onTriggered(e);
    }
  }, [allowAnyKey, triggerKeys, onTriggered]);

  const handleClickOrTouch = useCallback((e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onTriggered(e);
    }
  }, [onTriggered]);

  useEffect(() => {
    if (!disableClick) document.addEventListener('click', handleClickOrTouch);
    if (!disableTouch) document.addEventListener('touchstart', handleClickOrTouch);
    if (!disableKeys) document.addEventListener('keyup', handleKeyEvent);

    return () => {
      if (!disableClick) document.removeEventListener('click', handleClickOrTouch);
      if (!disableTouch) document.removeEventListener('touchstart', handleClickOrTouch);
      if (!disableKeys) document.removeEventListener('keyup', handleKeyEvent);
    }
  }, [disableClick, disableTouch, disableKeys, handleClickOrTouch, handleKeyEvent]);

  return ref;
}