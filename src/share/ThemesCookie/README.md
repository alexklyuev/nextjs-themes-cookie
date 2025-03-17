# ThemesCookie #

## Override default settings (optionally) ##
```js
setThemesCookieSetting("cookieKey", "_theme_");
setThemesCookieSetting("defaultThemeKey", "dark");
```
_In the root laout file, before component declaration_

## Add given props to root html tag ##
```js
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
  <ThemesCookieProviders>
    {children}
  </ThemesCookieProviders>
```
_In the root layout_

## Use the function from hook to set theme ##
```js
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
