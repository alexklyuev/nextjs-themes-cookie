import { FC, PropsWithChildren } from 'react';
import { ThemeKey } from './server.js';

declare const TCProvider: FC<PropsWithChildren>;
declare const useTCContext: () => {
    setTheme: (themeKey: ThemeKey | "system") => void;
};

export { TCProvider as ThemesCookieProviders, useTCContext as useThemesCookie };
