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

/***/ "./src/includes/custom-dialog/custom-dialog.js":
/*!*****************************************************!*\
  !*** ./src/includes/custom-dialog/custom-dialog.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConfirmDialog: () => (/* binding */ ConfirmDialog)\n/* harmony export */ });\nconst ConfirmDialog = {\n  show: userOptions => {\n    const options = {\n      text: \"Confirmation\",\n      textClass: \"\",\n      okText: \"Accept\",\n      okClass: \"\",\n      useCancel: true,\n      cancelText: \"Cancel\",\n      cancelClass: \"\",\n      modalClass: \"\",\n      boxClass: \"\",\n      success: false,\n      warning: false,\n      error: false,\n      ...userOptions\n    };\n    const originalBodyStyles = {\n      overflow: document.body.style.overflow,\n      height: document.body.style.height,\n      width: document.body.style.width\n    };\n\n    //OK icon template\n    const success = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-success\">\n                    <div class=\"icon-wrap-success-tip\"></div>\n                    <div class=\"icon-wrap-success-long\"></div>\n                    <div class=\"icon-wrap-success-placeholder\"></div>\n                    <div class=\"icon-wrap-success-fix\"></div>\n                </div>\n            </div>\n        `;\n\n    //Warning icon template\n    const warning = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-warning\">\n                    <div class=\"icon-wrap-warning-body\"></div>\n                    <div class=\"icon-wrap-warning-dot\"></div>\n                </div>\n            </div>\n        `;\n\n    //Error icon template\n    const error = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-error\">\n                    <div class=\"icon-wrap-error-x\">\n                        <div class=\"icon-wrap-error-left\"></div>\n                        <div class=\"icon-wrap-error-right\"></div>\n                    </div>\n                    <div class=\"icon-wrap-error-placeholder\"></div>\n                    <div class=\"icon-wrap-error-fix\"></div>\n                </div>\n            </div>\n        `;\n\n    //Ok button template\n    const ok = `\n            <button id=\"ok\" class=\"button ${options.okClass}\">${options.okText}</button>\n        `;\n\n    //Cancel button template\n    const cancel = `\n            <button id=\"cancel\" class=\"button ${options.cancelClass}\">${options.cancelText}</button>\n        `;\n\n    //Icon inject\n    let icons = \"\";\n    icons += options.success ? success : \"\";\n    icons += options.warning ? warning : \"\";\n    icons += options.error ? error : \"\";\n\n    //Cancel button inject\n    let useCancel = options.useCancel ? cancel : \"\";\n\n    //Html dummy\n    const template = `\n            <div id=\"modal\" class=\"modal ${options.modalClass}\">\n                <div class=\"box ${options.boxClass}\">\n                    <div class=\"content\">\n                        ${icons}\n                        <div class=\"text ${options.textClass}\">${options.text}</div>\n                    </div>\n                    <div class=\"buttons\">\n                        ${ok}${useCancel}\n                    </div>\n                </div>\n            </div>\n        `;\n    document.body.insertAdjacentHTML(\"beforeend\", template);\n    const dialog = document.getElementById(\"modal\");\n\n    // Prevents scrolling and scrollbar\n    document.body.style.cssText = ` overflow: hidden !important; height: 100%; width: 100%; `;\n    const handleKeyDown = event => {\n      if (event.key === \"Escape\") {\n        closeModal();\n      }\n    };\n\n    //Outside box\n    const handleClickOutside = event => {\n      if (event.target === dialog) {\n        closeModal();\n      }\n    };\n\n    //Remove modal\n    const remove = () => {\n      dialog.classList.add(\"cd-out\");\n      setTimeout(() => {\n        dialog.remove();\n        // Restore original styles\n        Object.assign(document.body.style, originalBodyStyles);\n      }, 300);\n    };\n    document.addEventListener(\"keydown\", handleKeyDown);\n    document.addEventListener(\"click\", handleClickOutside);\n    const closeModal = () => {\n      remove();\n      document.removeEventListener(\"keydown\", handleKeyDown);\n      document.removeEventListener(\"click\", handleClickOutside);\n    };\n    return new Promise((resolve, _) => {\n      document.getElementById(\"ok\").addEventListener(\"click\", () => {\n        remove();\n        resolve(true);\n      });\n      if (options.useCancel) {\n        document.getElementById(\"cancel\").addEventListener(\"click\", () => {\n          remove();\n          resolve(false);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack://meals/./src/includes/custom-dialog/custom-dialog.js?");

/***/ }),

/***/ "./src/js/pages/settings/clear-database.js":
/*!*************************************************!*\
  !*** ./src/js/pages/settings/clear-database.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _includes_custom_dialog_custom_dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../includes/custom-dialog/custom-dialog.js */ \"./src/includes/custom-dialog/custom-dialog.js\");\n\ndocument.getElementById(\"clearDatabase\").addEventListener(\"click\", async () => {\n  try {\n    const result = await _includes_custom_dialog_custom_dialog_js__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialog.show({\n      text: \"ALL DATABASE WILL BE PURGED COMPLETELY!!!<br>Would you like to continue?\",\n      warning: true,\n      okText: \"Yes, clear\",\n      cancelText: \"No, cancel\"\n    });\n    if (result === true) {\n      purgeDatabase();\n    }\n  } catch (err) {\n    console.error(\"Error showing context:\", err);\n  }\n});\nfunction purgeDatabase() {\n  fetch(\"app/database/truncate.php\", {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      action: \"truncate\"\n    })\n  });\n}\n\n//# sourceURL=webpack://meals/./src/js/pages/settings/clear-database.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/pages/settings/clear-database.js");
/******/ 	
/******/ })()
;