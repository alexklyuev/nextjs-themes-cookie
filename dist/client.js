"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/share/ThemesCookie/client.tsx






var _react = require('react'); var _react2 = _interopRequireDefault(_react);
var TCContext = _react.createContext.call(void 0, { setTheme: () => {
} });
var TCProvider = ({ children, readAction, writeAction }) => {
  const mediaQueryRef = _react.useRef.call(void 0, 
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null
  );
  const removeListenerRef = _react.useRef.call(void 0, null);
  const systemSetter = _react.useCallback.call(void 0, ({ matches }) => {
    const computedKey = matches ? "dark" : "light";
    writeAction("system", computedKey);
  }, []);
  const removeEventListener = _react.useCallback.call(void 0, () => {
    if (removeListenerRef.current) {
      removeListenerRef.current();
      removeListenerRef.current = null;
    }
  }, []);
  const addEventListener = _react.useCallback.call(void 0, () => {
    removeEventListener();
    if (mediaQueryRef.current) {
      mediaQueryRef.current.addEventListener("change", systemSetter);
      removeListenerRef.current = () => _optionalChain([mediaQueryRef, 'access', _ => _.current, 'optionalAccess', _2 => _2.removeEventListener, 'call', _3 => _3("change", systemSetter)]);
    }
  }, [removeEventListener, systemSetter]);
  const setTheme = _react.useCallback.call(void 0, 
    (themeKey) => {
      console.log("internal set theme");
      removeEventListener();
      if (themeKey === "system") {
        if (mediaQueryRef.current) systemSetter(mediaQueryRef.current);
        addEventListener();
      } else {
        writeAction("", themeKey);
      }
    },
    [addEventListener, removeEventListener, systemSetter]
  );
  _react.useEffect.call(void 0, () => {
    readAction().then(({ themeSource }) => {
      if (themeSource === "system") {
        addEventListener();
      }
    });
  }, [addEventListener]);
  return /* @__PURE__ */ _react2.default.createElement(TCContext.Provider, { value: { setTheme } }, children);
};
var useTCContext = () => {
  return _react.useContext.call(void 0, TCContext);
};




exports.ThemesCookieContext = TCContext; exports.ThemesCookieProvider = TCProvider; exports.useThemesCookie = useTCContext;
