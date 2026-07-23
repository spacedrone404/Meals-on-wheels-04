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

/***/ "./src/includes/ny-blobs/ny-blobs.js":
/*!*******************************************!*\
  !*** ./src/includes/ny-blobs/ny-blobs.js ***!
  \*******************************************/
/***/ (() => {

eval("// Новогодняя гирлянда появляющаяся 29, 30, 31 декабря и 1 января\n\nconst today = new Date();\nconst month = today.getMonth() + 1;\nconst date = today.getDate();\nif (month === 12 && date === 29 || month === 12 && date === 30 || month === 12 && date === 31 || month === 1 && date === 1) {\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    const starContainer = document.querySelector(\".ny-blobs\");\n    const numberOfStars = 48;\n    for (let i = 0; i < numberOfStars; i++) {\n      const star = document.createElement(\"div\");\n      star.classList.add(\"glowing-blobs\");\n      star.style.left = Math.random() * 100 + \"vw\";\n      star.style.animationDuration = 5 + Math.random() * 5 + \"s\";\n      star.style.animationDelay = Math.random() * 10 + \"s\";\n      starContainer.appendChild(star);\n    }\n  });\n  function setRandomBackground() {\n    const colors = [\"#ffd7d5\", \"#ffe9d6\", \"#ffffd1\", \"#d6ffda\", \"#d7eeff\", \"#dad6ff\", \"#ffd6e8\", \"#f5f5dc\", \"#f4e4e4\", \"#e4e6f4\"];\n    const randomColor = colors[Math.floor(Math.random() * colors.length)];\n    document.documentElement.style.setProperty(\"--main-bg-color\", randomColor);\n  }\n  setRandomBackground();\n}\n\n//# sourceURL=webpack://meals/./src/includes/ny-blobs/ny-blobs.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/includes/ny-blobs/ny-blobs.js"]();
/******/ 	
/******/ })()
;