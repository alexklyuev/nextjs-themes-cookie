# ThemesCookie #

Theme switcher and storage technique.
Stores in cookie, so no problem to render theme on server.
Supports system theme with dynamic switching.

Alternative to `next-themes`

## Override default settings (optionally) ##
```js
import { setThemesCookieSetting } from "nextjs-themes-cookie/server";

setThemesCookieSetting("cookieKey", "_theme_");
setThemesCookieSetting("defaultThemeKey", "dark");
```
_In the root laout file, before component declaration_

## Add given props to root html tag ##
```js
import { themesCookieReader } from "nextjs-themes-cookie/server";

  const { htmlProps } = await themesCookieReader();
  return (
    <html
      lang="en"
      {...htmlProps}
    >
    ...
```
_In the root layout_

## Wrap app in the provider ##
```jsx
import { ThemesCookieProviders } from "nextjs-themes-cookie/client";
...

  <ThemesCookieProviders>
    {children}
  </ThemesCookieProviders>
```
_In the root layout_

## Use the function from hook to set theme ##
```js
import { useThemesCookie } from "nextjs-themes-cookie/client";
...

  const { setTheme } = useThemesCookie();
```
_in any component inside the provider_

## Notes ##
### Cookie value ###
Cookie value could be one of the following:
- `system,light`
- `system,dark`
- `,light`
- `,dark`

Leading comma is normal
