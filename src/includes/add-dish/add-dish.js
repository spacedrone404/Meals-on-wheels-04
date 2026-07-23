import { ConfirmDialog } from "../custom-dialog/custom-dialog.js";
import { typeAndCat } from "../../js/_main.js";
import { workShop } from "../../js/_main.js";


let isOpen = false;
let isAnimating = false;

const BLOCK = document.getElementById("popUpContainer");
const BTN = document.getElementById("botPanBase-button");
const FORM = document.getElementById("popUpContainer-form");

BTN.addEventListener("click", function () {
  if (isAnimating) return;
  if (!isOpen) {
    blurBase();
    showPopup();
  } else {
    unblurBase();
    hidePopup();
  }
});

function blurBase() {
  document
    .querySelectorAll(
      ".dish-catalogue-wrapper, .content-wrapper, .menu-header, .search-container, #side-panel"
    )
    .forEach((el) => {
      el.style.filter = "blur(6px)";
      el.style.transition = "filter 0.4s ease-in-out";
      el.style.pointerEvents = "none";
    });

  document.querySelectorAll("body").forEach((el2) => {
    el2.style.overflowY = "hidden";
  });

  const scrollTop = document.getElementById("scrollTopMain");
  scrollTop.style.opacity = "0";
  scrollTop.style.pointerEvents = "none";
}

function unblurBase() {
  const scrollTop = document.getElementById("scrollTopMain");
  document
    .querySelectorAll(
      ".dish-catalogue-wrapper, .content-wrapper, .menu-header, .search-container, #side-panel"
    )
    .forEach((el) => {
      el.style.filter = "";
      el.style.transition = "filter 0.4s ease-in-out";
      el.style.pointerEvents = "auto";
    });

  document.querySelectorAll("body").forEach((el2) => {
    el2.style.overflowY = "auto";
  });

  scrollTop.style.opacity = "1";
  scrollTop.style.pointerEvents = "auto";
}

// Add dish popup
function showPopup() {
  BLOCK.style.display = "block";
  BLOCK.classList.add("popUpContainerEmerge");
  BLOCK.addEventListener(
    "animationend",
    function () {
      BLOCK.classList.remove("popUpContainerEmerge");
    },
    { once: true } 
  );
  BTN.textContent = "Close";
  isOpen = true;
}

// Remove dish popup
function hidePopup() {
  isAnimating = true;
  BLOCK.classList.add("popUpContainerFade");
  BLOCK.addEventListener(
    "animationend",
    function () {
      BLOCK.style.display = "none";
      BLOCK.classList.remove("popUpContainerFade");
      BTN.textContent = "Add the dish";
      isOpen = false;
      isAnimating = false;
    },
    { once: true }
  );
}

document.addEventListener("keydown", function (event) {
  if (event.key === "F4") {
    blurBase();
    showPopup();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    unblurBase();
    hidePopup();
  }
});

// Press on the button to add dish
FORM.addEventListener("submit", async function (event) {
  event.preventDefault();

  const code = document.getElementById("codeInput").value;
  const name = document.getElementById("nameInput").value;
  const description = document.getElementById("descriptionInput").value;
  const weight = document.getElementById("weightInput").value;
  const type = document.getElementById("baseTypeInput").value;
  const workshop = document.getElementById("shopInput").value;

  const section = catToSec(type, typeAndCat);

  const data = JSON.stringify({
    code: code,
    name: name,
    description: description,
    weight: weight,
    // section: section,
    type: type,
    workshop: workshop,
  });

  try {
    const response = await fetch("app/database/injector.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      let errorMsg = "";
      switch (response.status) {
        case 409: // err 409 already there
          errorMsg = `The dish with such ID number is already exists <br> in the databse, so reseting all inputs to default!`;
          break;
        default:
          errorMsg = await response.text();
      }

      await ConfirmDialog.show({
        text: errorMsg,
        warning: true,
        success: false,
        okText: "ОК",
        useCancel: false,
      });
      this.reset(); // Resets all inputs
      return;
    }

    const result = await response.json();

    if (result && result.message === "The dish successfuly added to the database") {
      const dialogResult = await ConfirmDialog.show({
        text: `${result.message}`,
        success: true,
        okText: "OK",
        useCancel: false,
      });

      if (dialogResult === true) {
        this.reset();

        location.reload(true); // Reload after success
      }
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Error handling request:", error);
    alert(error.message);
  }
});

// Link between category and menu sections (returns section)
// catName - category
function catToSec(catName, objName) {
  const section = objName[catName]; // define title of the section depending on category 
  return section;
}

document.addEventListener("DOMContentLoaded", () => {
  // producers
  renderdrop("shopInput", workShop); 
  createCustomSelect("shopInput"); // custom Dropdown
  
  // getting main.js and create array of categories
  const categoryesArray = Object.keys(typeAndCat); 
  renderdrop("baseTypeInput", categoryesArray); 
  createCustomSelect("baseTypeInput"); // custom Dropdown

  // Clear custom dropdowns upon  Reset
  const clearCustomSelects = () => {
    const customSelects = document.querySelectorAll(".custom-select");
    customSelects.forEach((customSelect) => {
      const selected = customSelect.querySelector(".selected");
      selected.textContent = " Select ";
      const options = customSelect.querySelector(".options");
      options.classList.remove("open");
    });
  };

  const form = document.getElementById("popUpContainer-form");
  form.addEventListener("reset", clearCustomSelects);
});

// document.getElementById("#botPanBase-button").style.zIndex = 10000000;
// showPopup()


// selectName - name id dropdown
// arrayNames - array of names for dropdown
function renderdrop(selectName, arrayNames) {
  const select = document.getElementById(selectName); // Getting existing select
  for (let i = 0; i <= arrayNames.length - 1; i++) {
    const option = new Option(arrayNames[i], arrayNames[i]); // Create new objects Option for each category
    select.add(option); // Adding option in  select
  }
}

// Custom dropdown
function createCustomSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");

  const selected = document.createElement("div");
  selected.classList.add("selected");

  // Initial text of the selected element
  selected.textContent = select.options[select.selectedIndex].text;
  selected.setAttribute("tabindex", "0");
  customSelect.appendChild(selected);

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");
  customSelect.appendChild(optionsContainer);

  // Loop through records skipping  value="" 
  for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    if (option.value === "") continue; 

    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = option.text;
    optionDiv.dataset.value = option.value;

    // Dropdown open up logic
    optionDiv.addEventListener("click", () => {
      selected.textContent = option.text;
      select.value = option.value;
      optionsContainer.classList.remove("open");
      selected.classList.remove("open");
    });
    optionsContainer.appendChild(optionDiv);
  }

  selected.addEventListener("click", () => {
    const isNowOpen = optionsContainer.classList.toggle("open");
    selected.classList.toggle("open", isNowOpen);
  });

  const closeDropdown = (e) => {
    if (!customSelect.contains(e.target)) {
      optionsContainer.classList.remove("open");
      selected.classList.remove("open");
    }
  };
  document.addEventListener("click", closeDropdown);

  const parent = select.parentNode;
  parent.insertBefore(customSelect, select);
  customSelect.appendChild(select);
  select.style.display = "none";
}
