import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import React, { FC, PropsWithChildren } from 'react';

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

declare const TCContext: React.Context<{
    setTheme: (themeKey: ThemeKey | "system") => void;
}>;
declare const TCProvider: FC<PropsWithChildren<{
    readAction: ReturnType<typeof makeThemesCookieReadAction>;
    writeAction: ReturnType<typeof makeThemesCookieWrireAction>;
}>>;
declare const useTCContext: () => {
    setTheme: (themeKey: ThemeKey | "system") => void;
};

export { type ThemeKey, type ThemeSource, TCContext as ThemesCookieContext, TCProvider as ThemesCookieProvider, makeThemesCookieReadAction, makeThemesCookieWrireAction, useTCContext as useThemesCookie };
