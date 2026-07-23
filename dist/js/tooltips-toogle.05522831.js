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

/***/ "./src/js/pages/settings/tooltips-toogle.js":
/*!**************************************************!*\
  !*** ./src/js/pages/settings/tooltips-toogle.js ***!
  \**************************************************/
/***/ (() => {

eval("function toggleTooltips(enabled) {\n  const tooltipElements = document.querySelectorAll(\".tooltip-text\");\n  if (!enabled) {\n    tooltipElements.forEach(el => el.classList.add(\"hidden\"));\n  } else {\n    tooltipElements.forEach(el => el.classList.remove(\"hidden\"));\n  }\n}\nfunction setCookie(name, value, days) {\n  const d = new Date();\n  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);\n  const expires = \"expires=\" + d.toUTCString();\n  document.cookie = `${name}=${value}; ${expires}; path=/`;\n}\nfunction getCookie(name) {\n  const cookieName = `${name}=`;\n  const decodedCookies = decodeURIComponent(document.cookie).split(\";\");\n  for (const cookie of decodedCookies) {\n    let trimmedCookie = cookie.trim();\n    if (trimmedCookie.startsWith(cookieName)) {\n      return trimmedCookie.slice(cookieName.length);\n    }\n  }\n  return \"\";\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const checkbox = document.getElementById(\"tooltipsToggle\");\n  const savedState = getCookie(\"tooltipsEnabled\");\n  const enabled = savedState === \"true\";\n  toggleTooltips(enabled);\n  if (checkbox) {\n    checkbox.checked = enabled;\n    checkbox.addEventListener(\"change\", () => {\n      const newEnabled = checkbox.checked;\n      toggleTooltips(newEnabled);\n      setCookie(\"tooltipsEnabled\", newEnabled ? \"true\" : \"false\");\n    });\n  }\n});\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/tooltips-toogle.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/settings/tooltips-toogle.js"]();
/******/ 	
/******/ })()
;