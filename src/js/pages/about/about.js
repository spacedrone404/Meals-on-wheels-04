import { handleKeyNavigation } from "../../tools/hotkeys.js";
handleKeyNavigation();

// Duplicate events tester
document.addEventListener("keydown", function (event) {
  console.log(`Key pressed: ${event.key}`);
});
