"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/share/ThemesCookie/server.ts
var delimeter = ",";
var makeThemesCookieReadAction = (cookies, cookieKey, defaultThemeKey) => {
  return async () => {
    let themeSource = "";
    let themeKey = defaultThemeKey;
    const store = await cookies();
    const value = _optionalChain([store, 'access', _ => _.get, 'call', _2 => _2(cookieKey), 'optionalAccess', _3 => _3.value]);
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



exports.makeThemesCookieReadAction = makeThemesCookieReadAction; exports.makeThemesCookieWrireAction = makeThemesCookieWrireAction;
