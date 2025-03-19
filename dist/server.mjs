// src/share/ThemesCookie/server.ts
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
export {
  makeThemesCookieReadAction,
  makeThemesCookieWrireAction
};
