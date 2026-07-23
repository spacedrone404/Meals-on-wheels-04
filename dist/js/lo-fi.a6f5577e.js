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

/***/ "./src/js/pages/settings/lo-fi.js":
/*!****************************************!*\
  !*** ./src/js/pages/settings/lo-fi.js ***!
  \****************************************/
/***/ (() => {

eval("const body = document.body;\nfunction setCookie(name, value, days) {\n  let expires = \"\";\n  if (days) {\n    const d = new Date();\n    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);\n    expires = \"; expires=\" + d.toUTCString();\n  }\n  document.cookie = name + \"=\" + (value || \"\") + expires + \"; path=/\";\n}\nfunction getCookie(name) {\n  const eq = name + \"=\";\n  const parts = document.cookie.split(\";\");\n  for (let c of parts) {\n    while (c.charAt(0) === \" \") c = c.substring(1);\n    if (c.indexOf(eq) === 0) return c.substring(eq.length);\n  }\n  return null;\n}\n(function () {\n  const toggle = document.getElementById(\"efxToggle\");\n  const isLofi = getCookie(\"lofi-mode\") === \"true\";\n  if (isLofi) {\n    body.classList.add(\"lo-fi-mode\");\n  }\n  if (toggle) {\n    if (isLofi) {\n      toggle.checked = true;\n    }\n    toggle.addEventListener(\"change\", function () {\n      if (this.checked) {\n        body.classList.add(\"lo-fi-mode\");\n        setCookie(\"lofi-mode\", \"true\", 30);\n      } else {\n        body.classList.remove(\"lo-fi-mode\");\n        setCookie(\"lofi-mode\", \"false\", 30);\n      }\n    });\n  }\n})();\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/lo-fi.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/settings/lo-fi.js"]();
/******/ 	
/******/ })()
;