import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type ThemeSource = "" | "system";
type ThemeKey = "light" | "dark";
declare const makeThemesCookieReadAction: (cookies: () => Promise<ReadonlyRequestCookies>, cookieKey: string, defaultThemeKey: ThemeKey) => () => Promise<{
    themeSource: ThemeSource;
    themeKey: ThemeKey;
    htmlProps: {
        className: ThemeKey;
        style: {
            colorScheme: ThemeKey;
        };
    };
}>;
declare const makeThemesCookieWrireAction: (cookies: () => Promise<ReadonlyRequestCookies>, cookieKey: string) => (themeSource: ThemeSource, themeKey: ThemeKey) => Promise<void>;

export { type ThemeKey, type ThemeSource, makeThemesCookieReadAction, makeThemesCookieWrireAction };
