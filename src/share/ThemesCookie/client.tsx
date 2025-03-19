import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ThemeKey, makeThemesCookieReadAction, makeThemesCookieWrireAction as makeThemesCookieWriteAction } from "./server";

const TCContext = createContext<{
  setTheme: (themeKey: ThemeKey | "system") => void;
}>({ setTheme: () => {} });

const TCProvider: FC<PropsWithChildren<{
  readAction: ReturnType<typeof makeThemesCookieReadAction>,
  writeAction: ReturnType<typeof makeThemesCookieWriteAction>,
}>> = ({ children, readAction, writeAction }) => {
  const mediaQueryRef = useRef<MediaQueryList>(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null
  );
  const removeListenerRef = useRef<() => void>(null);

  const systemSetter = useCallback(({ matches }: { matches: boolean }) => {
    const computedKey: ThemeKey = matches ? "dark" : "light";
    writeAction("system", computedKey);
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
      console.log('internal set theme')
      removeEventListener();
      if (themeKey === "system") {
        if (mediaQueryRef.current) systemSetter(mediaQueryRef.current);
        addEventListener();
      } else {
        writeAction("", themeKey);
      }
    },
    [addEventListener, removeEventListener, systemSetter]
  );

  useEffect(() => {
    readAction().then(({ themeSource }) => {
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

export { TCProvider as ThemesCookieProvider };
export { useTCContext as useThemesCookie };
export { TCContext as ThemesCookieContext };
