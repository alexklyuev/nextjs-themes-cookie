"use strict";
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

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
var setThemesCookieSetting = (name, value) => __async(void 0, null, function* () {
  settings[name] = value;
});
var themesCookieReader = () => __async(void 0, null, function* () {
  var _a;
  let themeSource = "";
  let themeKey = settings.defaultThemeKey;
  const store = yield (0, import_headers.cookies)();
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
});
var themesCookieWriter = (themeSource, themeKey) => __async(void 0, null, function* () {
  const store = yield (0, import_headers.cookies)();
  store.set(settings.cookieKey, [themeSource, themeKey].join(delimeter));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setThemesCookieSetting,
  themesCookieReader,
  themesCookieWriter
});
