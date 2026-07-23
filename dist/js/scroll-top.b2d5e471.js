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

/***/ "./src/includes/scroll-top/scroll-top.js":
/*!***********************************************!*\
  !*** ./src/includes/scroll-top/scroll-top.js ***!
  \***********************************************/
/***/ (() => {

eval("function handleScrollLogic(btn, container) {\n  // For window, we use scrollY; for elements, we use scrollTop\n  let currentScroll = container === window ? window.scrollY : container.scrollTop;\n  if (currentScroll > 384) {\n    if (!btn.classList.contains(\"show\")) {\n      btn.classList.remove(\"hide\");\n      btn.classList.add(\"show\");\n    }\n  } else {\n    if (btn.classList.contains(\"show\")) {\n      btn.classList.remove(\"show\");\n      btn.classList.add(\"hide\");\n    }\n  }\n}\n\n// Main index page scroller\nconst mainBtn = document.getElementById(\"scrollTopMain\");\nwindow.addEventListener(\"scroll\", () => {\n  if (mainBtn) handleScrollLogic(mainBtn, window);\n});\n\n// Modal scroller\nconst modalBtn = document.getElementById(\"scrollTopModal\");\nconst modalContainer = document.querySelector(\"#addDishes .adding-modal-content\");\nif (modalContainer) {\n  modalContainer.addEventListener(\"scroll\", () => {\n    if (modalBtn) handleScrollLogic(modalBtn, modalContainer);\n  });\n}\nfunction topFunction(id) {\n  if (id === \"scrollTopMain\") {\n    window.scrollTo({\n      top: 0,\n      behavior: \"smooth\"\n    });\n  } else if (id === \"scrollTopModal\") {\n    const modal = document.querySelector(\"#addDishes .adding-modal-content\");\n    if (modal) {\n      modal.scrollTo({\n        top: 0,\n        behavior: \"smooth\"\n      });\n    }\n  }\n}\n\n// Needed for inline onclick\nwindow.topFunction = topFunction;\n\n//# sourceURL=webpack://meals/./src/includes/scroll-top/scroll-top.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/includes/scroll-top/scroll-top.js"]();
/******/ 	
/******/ })()
;