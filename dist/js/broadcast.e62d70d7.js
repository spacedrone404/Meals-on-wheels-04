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

/***/ "./src/js/pages/index/broadcast.js":
/*!*****************************************!*\
  !*** ./src/js/pages/index/broadcast.js ***!
  \*****************************************/
/***/ (() => {

eval("//  true ->  menushow in table settings\n\nasync function sendBroadcastRequest(menuname) {\n  try {\n    const response = await fetch(`/app/templates/broadcast.php?menuname=${menuname}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify({\n        menuname\n      })\n    });\n    if (!response.ok) {\n      throw new Error(\"Server error: \" + response.status);\n    }\n    const result = await response.json();\n    console.log(\"Result:\", result);\n  } catch (err) {\n    console.error(\"Error:\", err.message);\n  }\n}\nfunction addBroadcastIndicator(templateName) {\n  const ifBroadcasted = document.getElementById(\"broadcasted\");\n  if (ifBroadcasted) {\n    ifBroadcasted.remove();\n  }\n  const broadcastedDiv = document.querySelector(`.template-badge[data-table=\"${templateName}\"]`);\n  const broadcasted = broadcastedDiv.parentNode.appendChild(document.createElement(\"p\"));\n  broadcasted.id = \"broadcasted\";\n  broadcasted.classList.add(\"broadcast-bounce\");\n  broadcasted.title = \"This template is being broadcasted right now,to broadcast another template select different one and press [F8] key or [Broadcast ₪] button\";\n  broadcasted.addEventListener(\"mouseenter\", () => broadcasted.style.cursor = \"pointer\");\n  broadcasted.innerHTML = \" ₪\";\n}\nasync function loadLastActiveTemplate() {\n  try {\n    const response = await fetch(\"/app/templates/broadcast.php\");\n    if (!response.ok) {\n      throw new Error(\"Server error: \" + response.status);\n    }\n    const data = await response.json();\n    if (data.active_menu && data.active_menu.menuname) {\n      addBroadcastIndicator(data.active_menu.menuname);\n    }\n  } catch (err) {\n    console.error(\"Error loading active template:\", err.message);\n  }\n}\ndocument.getElementById(\"item-0\").addEventListener(\"click\", async () => {\n  console.log(`Sending true in ${window.exportSelectedTemplate}`);\n  addBroadcastIndicator(window.exportSelectedTemplate);\n  await sendBroadcastRequest(window.exportSelectedTemplate);\n});\nwindow.addEventListener(\"load\", loadLastActiveTemplate);\n\n//# sourceURL=webpack://meals/./src/js/pages/index/broadcast.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/index/broadcast.js"]();
/******/ 	
/******/ })()
;