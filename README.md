# ThemesCookie #

Theme switcher and storage technique.
Stores in cookie, so no problem to render theme on server.
Supports system theme with dynamic switching.

Alternative to `next-themes`

## Usage ##

### Create server actions file ###
```ts
"use server";

import { cookies } from "next/headers";
import {
  makeThemesCookieReadAction,
  makeThemesCookieWrireAction,
} from "nextjs-themes-cookie/server";

const cookieKey = "theme";

export const themesCookieReadAction = makeThemesCookieReadAction(
  cookies,
  cookieKey,
  "dark"
);

export const themesCookieWriteAction = makeThemesCookieWrireAction(
  cookies,
  cookieKey
);
```

### Create file for client provider ###
```ts
"use client";

import type { FC, PropsWithChildren } from "react";
import { ThemesCookieProvider } from "nextjs-themes-cookie/client";
import {
  themesCookieReadAction,
  themesCookieWriteAction,
} from "./cookiesAction";

export const ThemeCookieProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemesCookieProvider
      readAction={themesCookieReadAction}
      writeAction={themesCookieWriteAction}
    >
      {children}
    </ThemesCookieProvider>
  );
};
```

### Place reader action results (htmlProps) and provider in root layout ###
```ts
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { htmlProps } = await themesCookieReadAction();
  return (
    <html lang="en" {...htmlProps}>
      <body>
        <ThemeCookieProviderWrapper>{children}</ThemeCookieProviderWrapper>
      </body>
    </html>
  );
}
```

### Use hook to change theme in some client component ###
```ts
import { useThemesCookie } from "nextjs-themes-cookie/client";
...
  const { setTheme } = useThemesCookie();
  ...
```

## Notes ##
### Cookie value ###
Cookie value could be one of the following:
- `system,light`
- `system,dark`
- `,light`
- `,dark`

Leading comma is normal
