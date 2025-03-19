// src/share/ThemesCookie/client.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef
} from "react";
var TCContext = createContext({ setTheme: () => {
} });
var TCProvider = ({ children, readAction, writeAction }) => {
  const mediaQueryRef = useRef(
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null
  );
  const removeListenerRef = useRef(null);
  const systemSetter = useCallback(({ matches }) => {
    const computedKey = matches ? "dark" : "light";
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
      removeListenerRef.current = () => mediaQueryRef.current?.removeEventListener("change", systemSetter);
    }
  }, [removeEventListener, systemSetter]);
  const setTheme = useCallback(
    (themeKey) => {
      console.log("internal set theme");
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
  return /* @__PURE__ */ React.createElement(TCContext.Provider, { value: { setTheme } }, children);
};
var useTCContext = () => {
  return useContext(TCContext);
};
export {
  TCContext as ThemesCookieContext,
  TCProvider as ThemesCookieProvider,
  useTCContext as useThemesCookie
};
