import React, { FC, PropsWithChildren } from 'react';
import { makeThemesCookieReadAction, makeThemesCookieWrireAction, ThemeKey } from './server.js';
import 'next/dist/server/web/spec-extension/adapters/request-cookies';

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

export { TCContext as ThemesCookieContext, TCProvider as ThemesCookieProvider, useTCContext as useThemesCookie };
