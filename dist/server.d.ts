import { cookies } from 'next/headers';

type ReadonlyRequestCookies = ReturnType<typeof cookies>;
type ThemeSource = "" | "system";
type ThemeKey = "light" | "dark";
declare const makeThemesCookieReadAction: (cookies: () => ReadonlyRequestCookies, cookieKey: string, defaultThemeKey: ThemeKey) => () => Promise<{
    themeSource: ThemeSource;
    themeKey: ThemeKey;
    htmlProps: {
        className: ThemeKey;
        style: {
            colorScheme: ThemeKey;
        };
    };
}>;
declare const makeThemesCookieWrireAction: (cookies: () => ReadonlyRequestCookies, cookieKey: string) => (themeSource: ThemeSource, themeKey: ThemeKey) => Promise<void>;

export { type ThemeKey, type ThemeSource, makeThemesCookieReadAction, makeThemesCookieWrireAction };
