"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/share/ThemesCookie/server.ts
var server_exports = {};
__export(server_exports, {
  makeThemesCookieReadAction: () => makeThemesCookieReadAction,
  makeThemesCookieWrireAction: () => makeThemesCookieWrireAction
});
module.exports = __toCommonJS(server_exports);
var delimeter = ",";
var makeThemesCookieReadAction = (cookies, cookieKey, defaultThemeKey) => {
  return async () => {
    let themeSource = "";
    let themeKey = defaultThemeKey;
    const store = await cookies();
    const value = store.get(cookieKey)?.value;
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
};
var makeThemesCookieWrireAction = (cookies, cookieKey) => {
  return async (themeSource, themeKey) => {
    const store = await cookies();
    store.set(cookieKey, [themeSource, themeKey].join(delimeter));
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeThemesCookieReadAction,
  makeThemesCookieWrireAction
});
