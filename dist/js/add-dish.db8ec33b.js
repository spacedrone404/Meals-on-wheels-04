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

/***/ "./src/includes/add-dish/add-dish.js":
/*!*******************************************!*\
  !*** ./src/includes/add-dish/add-dish.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _custom_dialog_custom_dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../custom-dialog/custom-dialog.js */ \"./src/includes/custom-dialog/custom-dialog.js\");\n/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/_main.js */ \"./src/js/_main.js\");\n\n\n\nlet isOpen = false;\nlet isAnimating = false;\nconst BLOCK = document.getElementById(\"popUpContainer\");\nconst BTN = document.getElementById(\"botPanBase-button\");\nconst FORM = document.getElementById(\"popUpContainer-form\");\nBTN.addEventListener(\"click\", function () {\n  if (isAnimating) return;\n  if (!isOpen) {\n    blurBase();\n    showPopup();\n  } else {\n    unblurBase();\n    hidePopup();\n  }\n});\nfunction blurBase() {\n  document.querySelectorAll(\".dish-catalogue-wrapper, .content-wrapper, .menu-header, .search-container, #side-panel\").forEach(el => {\n    el.style.filter = \"blur(6px)\";\n    el.style.transition = \"filter 0.4s ease-in-out\";\n    el.style.pointerEvents = \"none\";\n  });\n  document.querySelectorAll(\"body\").forEach(el2 => {\n    el2.style.overflowY = \"hidden\";\n  });\n  const scrollTop = document.getElementById(\"scrollTopMain\");\n  scrollTop.style.opacity = \"0\";\n  scrollTop.style.pointerEvents = \"none\";\n}\nfunction unblurBase() {\n  const scrollTop = document.getElementById(\"scrollTopMain\");\n  document.querySelectorAll(\".dish-catalogue-wrapper, .content-wrapper, .menu-header, .search-container, #side-panel\").forEach(el => {\n    el.style.filter = \"\";\n    el.style.transition = \"filter 0.4s ease-in-out\";\n    el.style.pointerEvents = \"auto\";\n  });\n  document.querySelectorAll(\"body\").forEach(el2 => {\n    el2.style.overflowY = \"auto\";\n  });\n  scrollTop.style.opacity = \"1\";\n  scrollTop.style.pointerEvents = \"auto\";\n}\n\n// Add dish popup\nfunction showPopup() {\n  BLOCK.style.display = \"block\";\n  BLOCK.classList.add(\"popUpContainerEmerge\");\n  BLOCK.addEventListener(\"animationend\", function () {\n    BLOCK.classList.remove(\"popUpContainerEmerge\");\n  }, {\n    once: true\n  });\n  BTN.textContent = \"Close\";\n  isOpen = true;\n}\n\n// Remove dish popup\nfunction hidePopup() {\n  isAnimating = true;\n  BLOCK.classList.add(\"popUpContainerFade\");\n  BLOCK.addEventListener(\"animationend\", function () {\n    BLOCK.style.display = \"none\";\n    BLOCK.classList.remove(\"popUpContainerFade\");\n    BTN.textContent = \"Add the dish\";\n    isOpen = false;\n    isAnimating = false;\n  }, {\n    once: true\n  });\n}\ndocument.addEventListener(\"keydown\", function (event) {\n  if (event.key === \"F4\") {\n    blurBase();\n    showPopup();\n  }\n});\ndocument.addEventListener(\"keydown\", function (event) {\n  if (event.key === \"Escape\") {\n    unblurBase();\n    hidePopup();\n  }\n});\n\n// Press on the button to add dish\nFORM.addEventListener(\"submit\", async function (event) {\n  event.preventDefault();\n  const code = document.getElementById(\"codeInput\").value;\n  const name = document.getElementById(\"nameInput\").value;\n  const description = document.getElementById(\"descriptionInput\").value;\n  const weight = document.getElementById(\"weightInput\").value;\n  const type = document.getElementById(\"baseTypeInput\").value;\n  const workshop = document.getElementById(\"shopInput\").value;\n  const section = catToSec(type, _js_main_js__WEBPACK_IMPORTED_MODULE_1__.typeAndCat);\n  const data = JSON.stringify({\n    code: code,\n    name: name,\n    description: description,\n    weight: weight,\n    // section: section,\n    type: type,\n    workshop: workshop\n  });\n  try {\n    const response = await fetch(\"app/database/injector.php\", {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: data\n    });\n    if (!response.ok) {\n      let errorMsg = \"\";\n      switch (response.status) {\n        case 409:\n          // err 409 already there\n          errorMsg = `The dish with such ID number is already exists <br> in the databse, so reseting all inputs to default!`;\n          break;\n        default:\n          errorMsg = await response.text();\n      }\n      await _custom_dialog_custom_dialog_js__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialog.show({\n        text: errorMsg,\n        warning: true,\n        success: false,\n        okText: \"ОК\",\n        useCancel: false\n      });\n      this.reset(); // Resets all inputs\n      return;\n    }\n    const result = await response.json();\n    if (result && result.message === \"The dish successfuly added to the database\") {\n      const dialogResult = await _custom_dialog_custom_dialog_js__WEBPACK_IMPORTED_MODULE_0__.ConfirmDialog.show({\n        text: `${result.message}`,\n        success: true,\n        okText: \"OK\",\n        useCancel: false\n      });\n      if (dialogResult === true) {\n        this.reset();\n        location.reload(true); // Reload after success\n      }\n    } else {\n      alert(`Error: ${result.error}`);\n    }\n  } catch (error) {\n    console.error(\"Error handling request:\", error);\n    alert(error.message);\n  }\n});\n\n// Link between category and menu sections (returns section)\n// catName - category\nfunction catToSec(catName, objName) {\n  const section = objName[catName]; // define title of the section depending on category \n  return section;\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // producers\n  renderdrop(\"shopInput\", _js_main_js__WEBPACK_IMPORTED_MODULE_1__.workShop);\n  createCustomSelect(\"shopInput\"); // custom Dropdown\n\n  // getting main.js and create array of categories\n  const categoryesArray = Object.keys(_js_main_js__WEBPACK_IMPORTED_MODULE_1__.typeAndCat);\n  renderdrop(\"baseTypeInput\", categoryesArray);\n  createCustomSelect(\"baseTypeInput\"); // custom Dropdown\n\n  // Clear custom dropdowns upon  Reset\n  const clearCustomSelects = () => {\n    const customSelects = document.querySelectorAll(\".custom-select\");\n    customSelects.forEach(customSelect => {\n      const selected = customSelect.querySelector(\".selected\");\n      selected.textContent = \" Select \";\n      const options = customSelect.querySelector(\".options\");\n      options.classList.remove(\"open\");\n    });\n  };\n  const form = document.getElementById(\"popUpContainer-form\");\n  form.addEventListener(\"reset\", clearCustomSelects);\n});\n\n// document.getElementById(\"#botPanBase-button\").style.zIndex = 10000000;\n// showPopup()\n\n// selectName - name id dropdown\n// arrayNames - array of names for dropdown\nfunction renderdrop(selectName, arrayNames) {\n  const select = document.getElementById(selectName); // Getting existing select\n  for (let i = 0; i <= arrayNames.length - 1; i++) {\n    const option = new Option(arrayNames[i], arrayNames[i]); // Create new objects Option for each category\n    select.add(option); // Adding option in  select\n  }\n}\n\n// Custom dropdown\nfunction createCustomSelect(selectId) {\n  const select = document.getElementById(selectId);\n  if (!select) return;\n  const customSelect = document.createElement(\"div\");\n  customSelect.classList.add(\"custom-select\");\n  const selected = document.createElement(\"div\");\n  selected.classList.add(\"selected\");\n\n  // Initial text of the selected element\n  selected.textContent = select.options[select.selectedIndex].text;\n  selected.setAttribute(\"tabindex\", \"0\");\n  customSelect.appendChild(selected);\n  const optionsContainer = document.createElement(\"div\");\n  optionsContainer.classList.add(\"options\");\n  customSelect.appendChild(optionsContainer);\n\n  // Loop through records skipping  value=\"\" \n  for (let i = 0; i < select.options.length; i++) {\n    const option = select.options[i];\n    if (option.value === \"\") continue;\n    const optionDiv = document.createElement(\"div\");\n    optionDiv.classList.add(\"option\");\n    optionDiv.textContent = option.text;\n    optionDiv.dataset.value = option.value;\n\n    // Dropdown open up logic\n    optionDiv.addEventListener(\"click\", () => {\n      selected.textContent = option.text;\n      select.value = option.value;\n      optionsContainer.classList.remove(\"open\");\n      selected.classList.remove(\"open\");\n    });\n    optionsContainer.appendChild(optionDiv);\n  }\n  selected.addEventListener(\"click\", () => {\n    const isNowOpen = optionsContainer.classList.toggle(\"open\");\n    selected.classList.toggle(\"open\", isNowOpen);\n  });\n  const closeDropdown = e => {\n    if (!customSelect.contains(e.target)) {\n      optionsContainer.classList.remove(\"open\");\n      selected.classList.remove(\"open\");\n    }\n  };\n  document.addEventListener(\"click\", closeDropdown);\n  const parent = select.parentNode;\n  parent.insertBefore(customSelect, select);\n  customSelect.appendChild(select);\n  select.style.display = \"none\";\n}\n\n//# sourceURL=webpack://meals/./src/includes/add-dish/add-dish.js?");

/***/ }),

/***/ "./src/includes/custom-dialog/custom-dialog.js":
/*!*****************************************************!*\
  !*** ./src/includes/custom-dialog/custom-dialog.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ConfirmDialog: () => (/* binding */ ConfirmDialog)\n/* harmony export */ });\nconst ConfirmDialog = {\n  show: userOptions => {\n    const options = {\n      text: \"Confirmation\",\n      textClass: \"\",\n      okText: \"Accept\",\n      okClass: \"\",\n      useCancel: true,\n      cancelText: \"Cancel\",\n      cancelClass: \"\",\n      modalClass: \"\",\n      boxClass: \"\",\n      success: false,\n      warning: false,\n      error: false,\n      ...userOptions\n    };\n    const originalBodyStyles = {\n      overflow: document.body.style.overflow,\n      height: document.body.style.height,\n      width: document.body.style.width\n    };\n\n    //OK icon template\n    const success = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-success\">\n                    <div class=\"icon-wrap-success-tip\"></div>\n                    <div class=\"icon-wrap-success-long\"></div>\n                    <div class=\"icon-wrap-success-placeholder\"></div>\n                    <div class=\"icon-wrap-success-fix\"></div>\n                </div>\n            </div>\n        `;\n\n    //Warning icon template\n    const warning = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-warning\">\n                    <div class=\"icon-wrap-warning-body\"></div>\n                    <div class=\"icon-wrap-warning-dot\"></div>\n                </div>\n            </div>\n        `;\n\n    //Error icon template\n    const error = `\n            <div class=\"icon-wrap\">\n                <div class=\"icon-wrap-error\">\n                    <div class=\"icon-wrap-error-x\">\n                        <div class=\"icon-wrap-error-left\"></div>\n                        <div class=\"icon-wrap-error-right\"></div>\n                    </div>\n                    <div class=\"icon-wrap-error-placeholder\"></div>\n                    <div class=\"icon-wrap-error-fix\"></div>\n                </div>\n            </div>\n        `;\n\n    //Ok button template\n    const ok = `\n            <button id=\"ok\" class=\"button ${options.okClass}\">${options.okText}</button>\n        `;\n\n    //Cancel button template\n    const cancel = `\n            <button id=\"cancel\" class=\"button ${options.cancelClass}\">${options.cancelText}</button>\n        `;\n\n    //Icon inject\n    let icons = \"\";\n    icons += options.success ? success : \"\";\n    icons += options.warning ? warning : \"\";\n    icons += options.error ? error : \"\";\n\n    //Cancel button inject\n    let useCancel = options.useCancel ? cancel : \"\";\n\n    //Html dummy\n    const template = `\n            <div id=\"modal\" class=\"modal ${options.modalClass}\">\n                <div class=\"box ${options.boxClass}\">\n                    <div class=\"content\">\n                        ${icons}\n                        <div class=\"text ${options.textClass}\">${options.text}</div>\n                    </div>\n                    <div class=\"buttons\">\n                        ${ok}${useCancel}\n                    </div>\n                </div>\n            </div>\n        `;\n    document.body.insertAdjacentHTML(\"beforeend\", template);\n    const dialog = document.getElementById(\"modal\");\n\n    // Prevents scrolling and scrollbar\n    document.body.style.cssText = ` overflow: hidden !important; height: 100%; width: 100%; `;\n    const handleKeyDown = event => {\n      if (event.key === \"Escape\") {\n        closeModal();\n      }\n    };\n\n    //Outside box\n    const handleClickOutside = event => {\n      if (event.target === dialog) {\n        closeModal();\n      }\n    };\n\n    //Remove modal\n    const remove = () => {\n      dialog.classList.add(\"cd-out\");\n      setTimeout(() => {\n        dialog.remove();\n        // Restore original styles\n        Object.assign(document.body.style, originalBodyStyles);\n      }, 300);\n    };\n    document.addEventListener(\"keydown\", handleKeyDown);\n    document.addEventListener(\"click\", handleClickOutside);\n    const closeModal = () => {\n      remove();\n      document.removeEventListener(\"keydown\", handleKeyDown);\n      document.removeEventListener(\"click\", handleClickOutside);\n    };\n    return new Promise((resolve, _) => {\n      document.getElementById(\"ok\").addEventListener(\"click\", () => {\n        remove();\n        resolve(true);\n      });\n      if (options.useCancel) {\n        document.getElementById(\"cancel\").addEventListener(\"click\", () => {\n          remove();\n          resolve(false);\n        });\n      }\n    });\n  }\n};\n\n//# sourceURL=webpack://meals/./src/includes/custom-dialog/custom-dialog.js?");

/***/ }),

/***/ "./src/js/_main.js":
/*!*************************!*\
  !*** ./src/js/_main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   typeAndCat: () => (/* binding */ typeAndCat),\n/* harmony export */   workShop: () => (/* binding */ workShop)\n/* harmony export */ });\n// Connection between types of dishes and caterogies and their sorting\nconst typeAndCat = {\n  \"Cold dishes\": \"Cold dishes\",\n  Salads: \"Cold dishes\",\n  \"Fish\": \"Second dishes\",\n  \"Meat\": \"Second dishes\",\n  \"Dairy\": \"Second dishes\",\n  \"Side\": \"Second dishes\",\n  \"Vegetables\": \"Second dishes\",\n  Drinks: \"Drinks\",\n  Side: \"Side\",\n  Baked: \"Baked\",\n  Misc: \"Misc\"\n};\n\n// Workshop producers\nconst workShop = [\"Production\", \"Bakery\", \"Cafe\"];\n\n//# sourceURL=webpack://meals/./src/js/_main.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/includes/add-dish/add-dish.js");
/******/ 	
/******/ })()
;