/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/pages/settings/flyout-toogle.js":
/*!************************************************!*\
  !*** ./src/js/pages/settings/flyout-toogle.js ***!
  \************************************************/
/***/ (() => {

eval("function toggleSidePanel(enabled) {\n  const sidePanel = document.getElementById(\"side-panel\");\n  if (!sidePanel) return;\n  if (enabled) {\n    sidePanel.classList.remove(\"hidden\");\n  } else {\n    sidePanel.classList.add(\"hidden\");\n  }\n}\nfunction setCookie(name, value, days = 365) {\n  const d = new Date();\n  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);\n  const expires = \"expires=\" + d.toUTCString();\n  document.cookie = `${name}=${value}; ${expires}; path=/`;\n}\nfunction getCookie(name) {\n  const cookieName = `${name}=`;\n  const decodedCookies = decodeURIComponent(document.cookie).split(\";\");\n  for (const cookie of decodedCookies) {\n    const trimmedCookie = cookie.trim();\n    if (trimmedCookie.startsWith(cookieName)) {\n      return trimmedCookie.slice(cookieName.length);\n    }\n  }\n  return \"\";\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const flyoutTrigger = document.getElementById(\"flyoutToggle\");\n  const savedState = getCookie(\"sidePanelEnabled\");\n  const enabled = savedState === \"true\";\n  toggleSidePanel(enabled);\n  if (flyoutTrigger) {\n    flyoutTrigger.checked = enabled;\n    flyoutTrigger.addEventListener(\"change\", () => {\n      const newEnabled = flyoutTrigger.checked;\n      toggleSidePanel(newEnabled);\n      setCookie(\"sidePanelEnabled\", newEnabled ? \"true\" : \"false\");\n    });\n  }\n});\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/flyout-toogle.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/settings/flyout-toogle.js"]();
/******/ 	
/******/ })()
;