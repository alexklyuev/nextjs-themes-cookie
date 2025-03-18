type ThemeSource = "" | "system";
type ThemeKey = "light" | "dark";
type ReaderResult = {
    themeSource: ThemeSource;
    themeKey: ThemeKey;
    htmlProps: {
        className: ThemeKey;
        style: {
            colorScheme: ThemeKey;
        };
    };
};
declare const settings: {
    cookieKey: string;
    defaultThemeKey: ThemeKey;
};
declare const setThemesCookieSetting: <T extends keyof typeof settings>(name: T, value: (typeof settings)[T]) => Promise<void>;
declare const themesCookieReader: () => Promise<ReaderResult>;
declare const themesCookieWriter: (themeSource: ThemeSource, themeKey: ThemeKey) => Promise<void>;

export { type ThemeKey, type ThemeSource, setThemesCookieSetting, themesCookieReader, themesCookieWriter };
