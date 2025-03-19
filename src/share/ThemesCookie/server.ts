import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type ThemeSource = "" | "system";

export type ThemeKey = "light" | "dark";

type Delimeter = ",";

type CookieValue = `${ThemeSource}${Delimeter}${ThemeKey}`;

const delimeter: Delimeter = ",";

export const makeThemesCookieReadAction = (
  cookies: () => Promise<ReadonlyRequestCookies>,
  cookieKey: string,
  defaultThemeKey: ThemeKey,
) => {
  return async () => {
    let themeSource: ThemeSource = "";
    let themeKey: ThemeKey = defaultThemeKey;
    const store = await cookies();
    const value = store.get(cookieKey)?.value as CookieValue;
    if (value) {
      [themeSource, themeKey] = value.split(delimeter) as [ThemeSource, ThemeKey];
    }
    return {
      themeSource,
      themeKey,
      htmlProps: {
        className: themeKey,
        style: { colorScheme: themeKey },
      },
    };
  
  };
};

export const makeThemesCookieWrireAction = (
  cookies: () => Promise<ReadonlyRequestCookies>,
  cookieKey: string,
) => {
  return async (
    themeSource: ThemeSource,
    themeKey: ThemeKey
  ) => {
    const store = await cookies();
    store.set(cookieKey, [themeSource, themeKey].join(delimeter));
  };
}
