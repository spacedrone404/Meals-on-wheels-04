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

/***/ "./src/js/pages/settings/version-toogle.js":
/*!*************************************************!*\
  !*** ./src/js/pages/settings/version-toogle.js ***!
  \*************************************************/
/***/ (() => {

eval("function setCookie(name, value, days) {\n  const d = new Date();\n  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);\n  const expires = \"expires=\" + d.toUTCString();\n  document.cookie = `${name}=${value}; ${expires}; path=/`;\n}\nfunction getCookie(name) {\n  const cookieName = `${name}=`;\n  const decodedCookies = decodeURIComponent(document.cookie).split(\";\");\n  for (const cookie of decodedCookies) {\n    let trimmedCookie = cookie.trim();\n    if (trimmedCookie.startsWith(cookieName)) {\n      return trimmedCookie.slice(cookieName.length);\n    }\n  }\n  return \"\";\n}\nfunction toggleVersionInfo(enabled) {\n  const versionElements = document.querySelectorAll(\".image-tooltip-ver\");\n  versionElements.forEach(el => {\n    if (!enabled) {\n      el.classList.add(\"hidden\");\n    } else {\n      el.classList.remove(\"hidden\");\n    }\n  });\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const checkbox = document.getElementById(\"versionToggle\");\n  if (checkbox) {\n    // Restore state from cookie\n    const savedState = getCookie(\"versionInfoEnabled\");\n    if (savedState === \"true\") {\n      checkbox.checked = true;\n      toggleVersionInfo(true);\n    } else {\n      checkbox.checked = false;\n      toggleVersionInfo(false);\n    }\n\n    // Handle checkbox change\n    checkbox.addEventListener(\"change\", () => {\n      if (checkbox.checked) {\n        toggleVersionInfo(true);\n        setCookie(\"versionInfoEnabled\", \"true\", 30);\n      } else {\n        toggleVersionInfo(false);\n        setCookie(\"versionInfoEnabled\", \"false\", 30);\n      }\n    });\n  }\n});\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/version-toogle.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/settings/version-toogle.js"]();
/******/ 	
/******/ })()
;