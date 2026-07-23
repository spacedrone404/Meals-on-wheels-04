/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/pages/settings/_settings.js":
/*!********************************************!*\
  !*** ./src/js/pages/settings/_settings.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools_hotkeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tools/hotkeys.js */ \"./src/js/tools/hotkeys.js\");\n\n(0,_tools_hotkeys_js__WEBPACK_IMPORTED_MODULE_0__.handleKeyNavigation)();\n\n// Duplicate events tester\ndocument.addEventListener(\"keydown\", function (event) {\n  console.log(`Key pressed: ${event.key}`);\n});\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/_settings.js?");

/***/ }),

/***/ "./src/js/tools/hotkeys.js":
/*!*********************************!*\
  !*** ./src/js/tools/hotkeys.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearTemplate: () => (/* binding */ clearTemplate),\n/* harmony export */   handleCustomerScreens: () => (/* binding */ handleCustomerScreens),\n/* harmony export */   handleKeyNavigation: () => (/* binding */ handleKeyNavigation),\n/* harmony export */   handleKeyTemplates: () => (/* binding */ handleKeyTemplates)\n/* harmony export */ });\nconst handleKeyNavigation = () => {\n  document.addEventListener(\"keydown\", function (event) {\n    if ([\"F1\", \"F2\", \"F3\", \"F5\", \"F6\", \"F7\", \"F8\", \"F9\", \"F11\"].includes(event.key)) {\n      event.preventDefault();\n      switch (event.key) {\n        case \"F1\":\n          window.location.href = \"/\";\n          break;\n        case \"F2\":\n          window.location.href = \"database.html\";\n          break;\n        case \"F3\":\n          window.location.href = \"settings.html\";\n          break;\n        case \"F5\":\n          document.querySelector(\"#printButton\").click();\n          break;\n        case \"F6\":\n          document.querySelector(\"#printButtonBake\").click();\n          break;\n        case \"F6\":\n          document.querySelector(\"#printButton\").click();\n          break;\n        case \"F7\":\n          document.querySelector(\"#addDishesBtn\").click();\n          break;\n        case \"F8\":\n          document.querySelector(\"#broadcastBtn\").click();\n          break;\n        case \"F9\":\n          document.querySelector(\"#saveBtn\").click();\n          break;\n        case \"F11\":\n          window.location.href = \"about.html\";\n          break;\n      }\n    }\n  });\n};\n\n// Clear active template\n\nconst clearTemplate = () => {\n  // event.preventDefault();\n  const templatesClear = event => {\n    if (event.ctrlKey && event.key === \"z\") {\n      document.querySelector(\"#clearTable\").click();\n    }\n  };\n  document.addEventListener(\"keydown\", templatesClear);\n};\n\n// Customer screens on index page\nconst handleCustomerScreens = () => {\n  document.addEventListener(\"keydown\", function (event) {\n    if ([\",\", \".\"].includes(event.key)) {\n      event.preventDefault();\n      switch (event.key) {\n        case \",\":\n          window.open(\"screen1.html\", \"_blank\");\n          break;\n        case \".\":\n          window.open(\"screen2.html\", \"_blank\");\n          break;\n      }\n    }\n  });\n};\n\n// Quick templates switch on index page\n\nconst handleKeyTemplates = () => {\n  document.addEventListener(\"DOMContentLoaded\", () => {\n    // working only in the root\n    if (window.location.pathname === \"/\" || window.location.pathname === \"/index.html\") {\n      const badges = document.querySelectorAll(\".template-badge\");\n      const keys = [\"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\", \"0\", \"-\", \"=\"];\n      document.addEventListener(\"keydown\", event => {\n        if (event.target.tagName === \"INPUT\" || event.target.tagName === \"TEXTAREA\" || event.target.isContentEditable) {\n          return; // Do not use hotkeys at input, textarea fields\n        }\n\n        const keyIndex = keys.indexOf(event.key); // Key index in array of keys\n        if (keyIndex !== -1 && badges[keyIndex]) {\n          // If KeyIndex found and template exists\n          event.preventDefault();\n          badges[keyIndex].click(); // Emulate click on template-badge\n        }\n      });\n    }\n  });\n};\n\n\n\n//# sourceURL=webpack://meals/./src/js/tools/hotkeys.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/pages/settings/_settings.js");
/******/ 	
/******/ })()
;