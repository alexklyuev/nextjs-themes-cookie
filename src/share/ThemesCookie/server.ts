"use server";

import { cookies } from "next/headers";

export type ThemeSource = "" | "system";

export type ThemeKey = "light" | "dark";

type Delimeter = ",";

type CookieValue = `${ThemeSource}${Delimeter}${ThemeKey}`;

type ReaderResult = {
  themeSource: ThemeSource;
  themeKey: ThemeKey;
  htmlProps: {
    className: ThemeKey;
    style: { colorScheme: ThemeKey };
  };
};

const delimeter: Delimeter = ",";

const settings = {
  cookieKey: "_theme_source_and_key_",
  defaultThemeKey: "dark" as ThemeKey,
};

export const setThemesCookieSetting: <T extends keyof typeof settings>(
  name: T,
  value: (typeof settings)[T]
) => Promise<void> = async (name, value) => {
  settings[name] = value;
};

export const themesCookieReader = async (): Promise<ReaderResult> => {
  let themeSource: ThemeSource = "";
  let themeKey: ThemeKey = settings.defaultThemeKey;
  const store = await cookies();
  const value = store.get(settings.cookieKey)?.value as CookieValue;
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

export const themesCookieWriter = async (
  themeSource: ThemeSource,
  themeKey: ThemeKey
) => {
  const store = await cookies();
  store.set(settings.cookieKey, [themeSource, themeKey].join(delimeter));
};
