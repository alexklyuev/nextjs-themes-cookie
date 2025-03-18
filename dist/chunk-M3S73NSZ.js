"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/share/ThemesCookie/server.ts
var _headers = require('next/headers');
var delimeter = ",";
var settings = {
  cookieKey: "_theme_source_and_key_",
  defaultThemeKey: "dark"
};
var setThemesCookieSetting = async (name, value) => {
  settings[name] = value;
};
var themesCookieReader = async () => {
  let themeSource = "";
  let themeKey = settings.defaultThemeKey;
  const store = await _headers.cookies.call(void 0, );
  const value = _optionalChain([store, 'access', _ => _.get, 'call', _2 => _2(settings.cookieKey), 'optionalAccess', _3 => _3.value]);
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
  const store = await _headers.cookies.call(void 0, );
  store.set(settings.cookieKey, [themeSource, themeKey].join(delimeter));
};





exports.setThemesCookieSetting = setThemesCookieSetting; exports.themesCookieReader = themesCookieReader; exports.themesCookieWriter = themesCookieWriter;
