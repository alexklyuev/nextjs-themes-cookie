"use server";
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
  setThemesCookieSetting: () => setThemesCookieSetting,
  themesCookieReader: () => themesCookieReader,
  themesCookieWriter: () => themesCookieWriter
});
module.exports = __toCommonJS(server_exports);
var import_headers = require("next/headers");
var delimeter = ",";
var settings = {
  cookieKey: "_theme_source_and_key_",
  defaultThemeKey: "dark"
};
var setThemesCookieSetting = async (name, value) => {
  settings[name] = value;
};
var themesCookieReader = async () => {
  var _a;
  let themeSource = "";
  let themeKey = settings.defaultThemeKey;
  const store = await (0, import_headers.cookies)();
  const value = (_a = store.get(settings.cookieKey)) == null ? void 0 : _a.value;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setThemesCookieSetting,
  themesCookieReader,
  themesCookieWriter
});
