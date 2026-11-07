"use client";

import { useEffect, useRef } from "react";

export function useTimeout(callback: (() => void) | undefined, delay: number) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const timeout = setTimeout(() => callbackRef.current?.(), delay);

    return () => clearTimeout(timeout);
  }, [delay]);
}
