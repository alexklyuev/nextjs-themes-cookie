"use client";

import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ThemeKey, themesCookieWriter, themesCookieReader } from "./server";

const TCContext = createContext<{
  setTheme: (themeKey: ThemeKey | "system") => void;
}>({ setTheme: () => {} });

const TCProvider: FC<PropsWithChildren> = ({ children }) => {
  const mediaQueryRef = useRef<MediaQueryList>(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null
  );
  const removeListenerRef = useRef<() => void>(null);

  const systemSetter = useCallback(({ matches }: { matches: boolean }) => {
    const computedKey: ThemeKey = matches ? "dark" : "light";
    themesCookieWriter("system", computedKey);
  }, []);

  const removeEventListener = useCallback(() => {
    if (removeListenerRef.current) {
      removeListenerRef.current();
      removeListenerRef.current = null;
    }
  }, []);

  const addEventListener = useCallback(() => {
    removeEventListener();
    if (mediaQueryRef.current) {
      mediaQueryRef.current.addEventListener("change", systemSetter);
      removeListenerRef.current = () =>
        mediaQueryRef.current?.removeEventListener("change", systemSetter);
    }
  }, [removeEventListener, systemSetter]);

  const setTheme = useCallback(
    (themeKey: ThemeKey | "system") => {
      removeEventListener();
      if (themeKey === "system") {
        if (mediaQueryRef.current) systemSetter(mediaQueryRef.current);
        addEventListener();
      } else {
        themesCookieWriter("", themeKey);
      }
    },
    [addEventListener, removeEventListener, systemSetter]
  );

  useEffect(() => {
    themesCookieReader().then(({ themeSource }) => {
      if (themeSource === "system") {
        addEventListener();
      }
    });
  }, [addEventListener]);

  return (
    <TCContext.Provider value={{ setTheme }}>{children}</TCContext.Provider>
  );
};

const useTCContext = () => {
  return useContext(TCContext);
};

export { TCProvider as ThemesCookieProviders };
export { useTCContext as useThemesCookie };
