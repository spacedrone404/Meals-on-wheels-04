
const handleKeyNavigation = () => {
  document.addEventListener("keydown", function (event) {
    if (["F1", "F2", "F3", "F5", "F6", "F7", "F8", "F9", "F11"].includes(event.key)) {
      event.preventDefault();

      switch (event.key) {
        case "F1":
          window.location.href = "/";
          break;
        case "F2":
          window.location.href = "database.html";
          break;
        case "F3":
          window.location.href = "settings.html";
          break;
        case "F5":
          document.querySelector("#printButton").click();
          break;
        case "F6":
          document.querySelector("#printButtonBake").click();
          break;
        case "F6":
          document.querySelector("#printButton").click();
          break;
        case "F7":
          document.querySelector("#addDishesBtn").click();
          break;
        case "F8":
          document.querySelector("#broadcastBtn").click();
          break;
        case "F9":
          document.querySelector("#saveBtn").click();
          break;
        case "F11":
          window.location.href = "about.html";
          break;          
      }
    }
  });
};

// Clear active template

const clearTemplate = () => {
  // event.preventDefault();
  const templatesClear = (event) => {
    if (event.ctrlKey && event.key === "z") {
      document.querySelector("#clearTable").click();
    }
  };
  document.addEventListener("keydown", templatesClear);
};

// Customer screens on index page
const handleCustomerScreens = () => {
  document.addEventListener("keydown", function (event) {
    if ([",", "."].includes(event.key)) {
      event.preventDefault();

      switch (event.key) {
        case ",":
          window.open("screen1.html", "_blank");
          break;
        case ".":
          window.open("screen2.html", "_blank");
          break;
      }
    }
  });
};

// Quick templates switch on index page

const handleKeyTemplates = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // working only in the root
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      const badges = document.querySelectorAll(".template-badge");
      const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];

      document.addEventListener("keydown", (event) => {
        if (
          event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA" ||
          event.target.isContentEditable
        ) {
          return; // Do not use hotkeys at input, textarea fields
        }

        const keyIndex = keys.indexOf(event.key); // Key index in array of keys
        if (keyIndex !== -1 && badges[keyIndex]) {
          // If KeyIndex found and template exists
          event.preventDefault();
          badges[keyIndex].click(); // Emulate click on template-badge
        }
      });
    }
  });
};

export {
  handleKeyNavigation,
  handleKeyTemplates,
  clearTemplate,
  handleCustomerScreens,
};
