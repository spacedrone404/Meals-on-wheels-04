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

/***/ "./src/includes/theme-switcher/theme-switcher.js":
/*!*******************************************************!*\
  !*** ./src/includes/theme-switcher/theme-switcher.js ***!
  \*******************************************************/
/***/ (() => {

eval("const toggleBtn = document.getElementById(\"themeToggle\");\nconst body = document.body;\nconst THEME_KEY = \"theme\";\nfunction applyTheme(theme) {\n  body.classList.remove(\"light\", \"dark\");\n  body.classList.add(theme);\n}\nconst savedTheme = localStorage.getItem(THEME_KEY);\nif (savedTheme) {\n  applyTheme(savedTheme);\n} else {\n  applyTheme(\"dark\"); // Default theme\n  localStorage.setItem(THEME_KEY, \"dark\");\n}\nfunction toggleTheme() {\n  const newTheme = body.classList.contains(\"dark\") ? \"light\" : \"dark\";\n  applyTheme(newTheme);\n  localStorage.setItem(THEME_KEY, newTheme);\n}\ntoggleBtn.addEventListener(\"click\", toggleTheme);\n\n// Hotkey  [CTRL] + [L]\ndocument.addEventListener(\"keydown\", e => {\n  if (e.ctrlKey && e.key.toLowerCase() === \"l\") {\n    e.preventDefault();\n    toggleTheme();\n  }\n});\n\n//# sourceURL=webpack://meals/./src/includes/theme-switcher/theme-switcher.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/includes/theme-switcher/theme-switcher.js"]();
/******/ 	
/******/ })()
;