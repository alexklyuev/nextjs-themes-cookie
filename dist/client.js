"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/share/ThemesCookie/client.tsx
var client_exports = {};
__export(client_exports, {
  ThemesCookieProviders: () => TCProvider,
  useThemesCookie: () => useTCContext
});
module.exports = __toCommonJS(client_exports);
var import_react = __toESM(require("react"));

// src/share/ThemesCookie/server.ts
var import_headers = require("next/headers");
var delimeter = ",";
var settings = {
  cookieKey: "_theme_source_and_key_",
  defaultThemeKey: "dark"
};
var themesCookieReader = async () => {
  let themeSource = "";
  let themeKey = settings.defaultThemeKey;
  const store = await (0, import_headers.cookies)();
  const value = store.get(settings.cookieKey)?.value;
  if (value) {
    [themeSource, themeKey] = value.split(delimeter);
  }
  return {
    themeSource,
    themeKey,
    htmlProps: {
      className: themeKey,
      style: { colorScheme: themeKey }
    }
  };
};
var themesCookieWriter = async (themeSource, themeKey) => {
  const store = await (0, import_headers.cookies)();
  store.set(settings.cookieKey, [themeSource, themeKey].join(delimeter));
};

// src/share/ThemesCookie/client.tsx
var TCContext = (0, import_react.createContext)({ setTheme: () => {
} });
var TCProvider = ({ children }) => {
  const mediaQueryRef = (0, import_react.useRef)(
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null
  );
  const removeListenerRef = (0, import_react.useRef)(null);
  const systemSetter = (0, import_react.useCallback)(({ matches }) => {
    const computedKey = matches ? "dark" : "light";
    themesCookieWriter("system", computedKey);
  }, []);
  const removeEventListener = (0, import_react.useCallback)(() => {
    if (removeListenerRef.current) {
      removeListenerRef.current();
      removeListenerRef.current = null;
    }
  }, []);
  const addEventListener = (0, import_react.useCallback)(() => {
    removeEventListener();
    if (mediaQueryRef.current) {
      mediaQueryRef.current.addEventListener("change", systemSetter);
      removeListenerRef.current = () => mediaQueryRef.current?.removeEventListener("change", systemSetter);
    }
  }, [removeEventListener, systemSetter]);
  const setTheme = (0, import_react.useCallback)(
    (themeKey) => {
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
  (0, import_react.useEffect)(() => {
    themesCookieReader().then(({ themeSource }) => {
      if (themeSource === "system") {
        addEventListener();
      }
    });
  }, [addEventListener]);
  return /* @__PURE__ */ import_react.default.createElement(TCContext.Provider, { value: { setTheme } }, children);
};
var useTCContext = () => {
  return (0, import_react.useContext)(TCContext);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemesCookieProviders,
  useThemesCookie
});
