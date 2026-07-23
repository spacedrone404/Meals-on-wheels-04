// Custom alerts
import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

// Support of hotkeys
import {
  handleKeyNavigation,
  handleKeyTemplates,
  handleCustomerScreens,
  clearTemplate,
} from "../../tools/hotkeys.js";
handleKeyNavigation();
handleKeyTemplates();
handleCustomerScreens();
clearTemplate();

// Types and categories
import { typeAndCat } from "../../_main.js";

// Export title of the template to print.js
let templateId;

// Active template upon broadcast
let exportSelectedTemplate;

// Customer screens

// window.open("screen2.html", "_blank");
// window.open("screen1.html", "_blank");

// Categories and dishes

const categories = [
  { name: "Cold dishes", container: "menuContainerCold" },
  { name: "First dishes", container: "menuContainerFirst" },
  { name: "Second dishes", container: "menuContainerSecond" },
  { name: "Drinks", container: "menuContainerDrinks" },
  { name: "Side", container: "menuContainerSide" },
  { name: "Bread", container: "menuContainerBread" },
  { name: "Baked", container: "menuContainerBakery" },
  { name: "Misc", container: "menuContainerMisc" },
];

function renderMenuStructure(targetContainer) {
  const menuHTML = categories
    .map(
      (category) => `
    <div id="categorymenu">≡ ${category.name} ≡</div>
    <div id="${category.container}"></div>
  `
    )
    .join("");
  targetContainer.innerHTML = menuHTML;
}

// Load dishes on index-template page

function loadMenuData(templateName) {
  const wrapper = document.querySelector(".template-menu-wrapper");
  wrapper.dataset.templateName = templateName;

  // Clean wrapper and re-render
  wrapper.innerHTML = "";
  renderMenuStructure(wrapper);

  //  Subcategories (Type) Beta
  const mainToSubs = {};
  for (const [sub, main] of Object.entries(typeAndCat)) {
    if (!mainToSubs[main]) {
      mainToSubs[main] = [];
    }
    mainToSubs[main].push(sub);
  }

  // For Each category request and fill
  const categoryPromises = categories.map(async ({ name, container }) => {
    const subs = mainToSubs[name] || [name];
    const subFetches = subs.map((sub) =>
      fetch(
        `app/templates/parse-templates.php?category=${encodeURIComponent(
          sub
        )}&template=${templateName}`
      )
        .then((res) => res.json())
        .then((data) => ({ sub, data }))
        .catch((err) => ({ sub, data: [] }))
    );
    const subResults = await Promise.all(subFetches);
    return {
      container,
      subResults,
    };
  });

  Promise.all(categoryPromises).then((results) => {
    results.forEach(({ container, subResults }) => {
      const el = document.getElementById(container);
      // Clear to prevent duplicates
      el.innerHTML = "";

      subResults.forEach(({ sub, data }) => {
        if (data.length > 0) {
          el.insertAdjacentHTML(
            "beforeend",
            `
          <div class="subcategorymenu">${sub}</div>
        `
          );

          // Dish render
          data.forEach((item) => {
            // sanity check
            if (!item.id) console.error("Missing id:", item);

            el.insertAdjacentHTML(
              "beforeend",
              `
            <div class="menu-header menu-item">
              <div class="menu-elem menu-code">${item.code}</div>
              <div class="menu-info">
                <div class="menu-elem menu-title">${item.name}</div>
                <div class="menu-elem menu-description">${item.description}</div>
              </div>
              <div class="menu-elem menu-volume">${item.weight}</div>
              <div class="menu-elem editable menu-price" title="Change dish price on the active template" data-id="${item.id}" contenteditable>${item.price}</div>
              <button class="save-button" title="Update dish price on the active template" type="button"></button>
              <button class="delete-btn" title="Remove the dish from the active template" data-code="${item.code}">✕</button>
            </div>
          `
            );
          });
        }
      });
    });

    attachPriceEditHandlers();
    attachDeleteHandlers();
  });
}

// Edit of the price in active template
function attachPriceEditHandlers() {
  const prices = document.querySelectorAll(".editable.menu-price");

  prices.forEach((price) => {
    let saveButton = price.nextElementSibling; // Save button is the next sibling

    price.addEventListener("focus", () => {
      saveButton.classList.add("visible");
    });

    price.addEventListener("blur", () => {
      setTimeout(() => {
        saveButton.classList.remove("visible");
      }, 100);
    });

    // Save upon button click
    saveButton.addEventListener("mousedown", () => {
      // Click event not working only mousedown
      handleSaveClick(price);
    });

    // Save upon pressing Enter
    price.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault(); // Prevent line break
        handleSaveClick(price);
      }
    });
  });
}

// Save button logic
function handleSaveClick(price) {
  const value = price.textContent.trim().replace(/[^0-9.,]/g, ""); // Removing all non-numeric symbols
  const itemID = price.dataset.id;
  const templateName = document.querySelector(".template-menu-wrapper").dataset
    .templateName;

  if (itemID !== "undefined") {
    updatePriceInDB(value, itemID, templateName);
  } else {
    console.error("Cannot update price: item ID is undefined");
  }
  price.blur(); // Remove focus
}

// Updating price 
function updatePriceInDB(price, itemID, templateName) {
  fetch("/app/templates/update-price.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: itemID,
      price: price,
      template: templateName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);

      loadDishes(); // Update page after price change
    })
    .catch((error) => console.error("Error:", error));
}

// Deleting dish from active template
function attachDeleteHandlers() {
  const wrapper = document.querySelector(".template-menu-wrapper");
  const templateName = wrapper.dataset.templateName;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const code = this.getAttribute("data-code");

      const menuItemElement = this.closest(".menu-item");

      try {
        const confirmed = await ConfirmDialog.show({
          text: "Are you sure you would like to delete this dish from the menu?",
          error: true,
          okText: "Delete",
          cancelText: "Cancel",
        });

        if (!confirmed) return;

        // Delete item
        fetch(`app/templates/delete-item.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            templateName: templateName,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.success) {
              menuItemElement.remove();
              updateNoDish(categories);
              loadDishes(); // Update page after dish delete
            } else {
              alert("Error upon deletion: " + response.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // alert("Error.");
          });
      } catch (err) {
        console.error("Error upon deletion of the element:", err);
      }
    });
  });
}

// No dishes -> add from base banner
// function updateNoDish(categories) {
//   categories.forEach(({ container }) => {
//     const el = document.getElementById(container);
//     if (!el) return;
//     const hasDishes = el.querySelector(".menu-item") !== null;
//   });
// }

// Determination of category based upon template ID
function determineCategory(templateId) {
  if (templateId.startsWith("template_dinner")) return "Dinner";
  if (templateId.startsWith("template_cafe")) return "Cafeterium";
  if (templateId.startsWith("template_breakfast")) return "Breakfast";
  return "Unknown";
}

// HTML render of title
function renderHeader(category, date, templateId) {
  const headerHTML = ` <div class="menu-editor-header-wrapper"> <div class="menu-editor-header-title"> ► Menu editor</div> <div class="menu-editor-template-wrapper" title="Active template and it's date"> <div class="circle">♦</div> <div class="name">${category}</div> <div class="date">${date}</div> </div> <div class="menu-editor-clear"> <a id="clearTable" title="Totally wipes out selected template [CTRL] + [Z]" data-template="${templateId}">Wipe template</a> </div> </div> `;

  const headerContainer = document.getElementById("menu-editor-header");
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;

    // Clear template logic
    document
      .getElementById("clearTable")
      .addEventListener("click", async () => {
        try {
          // Showing custom dialog
          const result = await ConfirmDialog.show({
            text: "Current template will be wiped out.<br>Dishes will remain unchanged in the database.<br>Would you like to continue?",
            warning: true,
            okText: "Yes, wipe out",
            cancelText: "No, cancel",
          });

          // ОК -> clear
          if (result === true) {
            truncateTable(templateId); // Clear template
          }
        } catch (err) {
          console.error("Error showing context:", err);
        }
      });
  }
}

// Clear active template completely
export function truncateTable(templateId) {
  fetch("app/templates/truncate-table.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "truncate-table", template: templateId }),
  })
    .then((response) => response.json())
    .then((data) => {
      // alert(data.message || "Operation complete.");
      // Optionally reload the menu data to reflect the cleared state
      loadMenuData(templateId);
    })
    .catch((error) => {
      console.error("Error truncating table:", error);
      alert("Error happened.");
    });
}

// Circle and dates template listener
document
  .querySelectorAll(".template-badge, .template-data-link")
  .forEach((badge) => {
    badge.addEventListener("click", (e) => {
      e.preventDefault();
      const templateId = badge.getAttribute("data-table");
      selectTemplate(templateId);
    });
  });

// Highligting active template with a circle

function highlightBadge(templateId) {
  document.querySelectorAll(".template-badge").forEach((badge) => {
    badge.classList.remove("selected", "activeTemplate");
  });

  const selectedBadge = document.querySelector(
    `.template-badge[data-table="${templateId}"]`
  );

  if (selectedBadge) {
    selectedBadge.classList.add("selected", "activeTemplate");
  }
}

// Loading active template from из localStorage

function loadSavedTemplate() {
  const savedTemplateId = localStorage.getItem("selectedTemplate");
  if (savedTemplateId) {
    selectTemplate(savedTemplateId);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSavedTemplate();
});

// Global store, prevent duplicates

let loadedData = null;

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchBarModal");
  const placeholderText =
    "Start typing dish name, type, producer or dish ID ... to clear form press [ESC], to close the window press [CTRL] + [Q]";
  let i = 0;
  function typeNext() {
    if (i <= placeholderText.length) {
      input.placeholder = placeholderText.slice(0, i++);
      setTimeout(typeNext, 100 + Math.random() * 50);
    }
  }
  typeNext();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      input.value = "";
      filterDishes({ target: input });
    }
  });
});

// Modal window and data preload
const addButton = document.getElementById("addDishesBtn");
addButton.addEventListener("click", async () => {
  document.getElementById("searchBarModal").value = ""; // Reset search field upon subsequent execution

  if (!loadedData) {
    // Loading data if it is not loaded
    loadedData = await loadDishes();
  }
  // openModal(); 
  onModalOpen(); // inject of correct template name and date

  // Type of template and it's date

  const name = document.querySelector(".menu-editor-wrapper .name").textContent;
  const date = document.querySelector(".menu-editor-wrapper .date").textContent;

  const templateNameDatemodal = document.querySelector(
    "#addDishes .templateNameDatemodal"
  );
  templateNameDatemodal.textContent = `${name} ${date}`;

  // Replication of template type and it's date to the bottom popup notification

  const sideBanner = document.getElementById("template-name-date-bottom");
  sideBanner.innerHTML = ""; // clear to prevent duplicates
  sideBanner.appendChild(templateNameDatemodal.cloneNode(true));

  sideBanner.style.display = "none";
  sideBanner.classList.remove("fade-out");
  const modal = document.querySelector("#addDishes .adding-modal-content");

  // Remove previous listener to prevent duplicates
  if (modal._scrollListener) {
    modal.removeEventListener("scroll", modal._scrollListener);
  }

  modal._scrollListener = function () {
    if (modal.scrollTop >= 448) {
      sideBanner.style.display = "flex"; // show/hide banner conditions
      sideBanner.classList.remove("fade-out");
    } else if (modal.scrollTop < 448 && sideBanner.style.display === "flex") {
      sideBanner.classList.add("fade-out");
    }
  };

  modal.addEventListener("scroll", modal._scrollListener);

  runAddDishesToTemplate(); // Showcasing data
});

// Saving original title Medu Editor / templates
const modalContainer = document.querySelector("#addDishes");
const originalTitle = document.title;

function executeFullClose() {
  if (typeof closeModal === "function") closeModal();

  modalContainer.style.display = "none";
  document.title = originalTitle;
}

modalContainer
  .querySelector(".close")
  .addEventListener("click", executeFullClose);

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "q") {
    executeFullClose();
  }
});

// Injecting date and title of active template into modal title

function onModalOpen() {
  const name = document
    .querySelector(".menu-editor-wrapper .name")
    .textContent.trim();
  const date = document
    .querySelector(".menu-editor-wrapper .date")
    .textContent.trim();
  const combinedText = `${name} ${date}`;
  const templateNameDatemodal = document.querySelector(
    "#addDishes .templateNameDatemodal"
  );
  if (templateNameDatemodal) {
    templateNameDatemodal.textContent = combinedText;
  }

  document.title = combinedText;
}


// Modal window 
async function runAddDishesToTemplate() {
  const searchInput = document.getElementById("searchBarModal");
  const catalogueWrapper = document.querySelector(
    ".dish-catalogue-wrapper-modal"
  );

  if (!catalogueWrapper) return;

  // Clear previous results
  catalogueWrapper.innerHTML = "";

  // Getting dishes with IDs already on the list
  const existingCodes = getExistingDishCodes();

  // Use loadedData, fallback for loading
  const dishes = Array.isArray(loadedData) ? loadedData : await loadDishes();

  // Dish cards render excluding already exisiting (code)
  dishes.forEach((dish) => {
    // Convert to string
    const codeStr = String(dish.code).trim();
    if (existingCodes.has(codeStr)) {
      // skip dishes that already present in the template
      return;
    }
    catalogueWrapper.appendChild(createDishCard(dish));
  });

  searchInput.addEventListener("input", filterDishes);

  // Sorting dishes in modal window
  // Collator is faster than localCompare

  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  function sortDishesAsc() {
    const catalogueWrapper = document.querySelector(
      ".dish-catalogue-wrapper-modal"
    );
    const existingCodes = getExistingDishCodes();

    // Highlight logic
    document
      .querySelector(".menu-icon-angle__down")
      .classList.remove("active-sort");
    document.querySelector(".menu-icon-angle__up").classList.add("active-sort");

    // Sorting
    loadedData.sort((a, b) => collator.compare(String(a.code), String(b.code)));

      // Clear and re-render dishes that are still not added to the list 
    catalogueWrapper
      .querySelectorAll(".dish-wrapper")
      .forEach((el) => el.remove());
    const fragment = document.createDocumentFragment();

    loadedData.forEach((dish) => {
      if (!existingCodes.has(String(dish.code).trim())) {
        fragment.appendChild(createDishCard(dish));
      }
    });

    catalogueWrapper.appendChild(fragment);
  }

  function sortDishesDesc() {
    const catalogueWrapper = document.querySelector(
      ".dish-catalogue-wrapper-modal"
    );
    const existingCodes = getExistingDishCodes();

    // Highlight logic
    document
      .querySelector(".menu-icon-angle__up")
      .classList.remove("active-sort");
    document
      .querySelector(".menu-icon-angle__down")
      .classList.add("active-sort");

    // Sort backwards 
    loadedData.sort((a, b) => collator.compare(String(b.code), String(a.code)));

    // Clear and re-render dishes that are still not added to the list 
    catalogueWrapper
      .querySelectorAll(".dish-wrapper")
      .forEach((el) => el.remove());
    const fragment = document.createDocumentFragment();

    loadedData.forEach((dish) => {
      if (!existingCodes.has(String(dish.code).trim())) {
        fragment.appendChild(createDishCard(dish));
      }
    });

    catalogueWrapper.appendChild(fragment);
  }

  // Sort dishes upon click
  document.querySelector(".menu-icon-angle__up").onclick = sortDishesAsc;
  document.querySelector(".menu-icon-angle__down").onclick = sortDishesDesc;


  closeCtrlQModal();
}

function closeCtrlQModal() {
  const templatesEsc = (event) => {
    if (event.ctrlKey && event.key === "q") {
      closeModal();
    }
  };
  document.addEventListener("keydown", templatesEsc);
}

// Parsing and remembering existing dish codes on selected template
function getExistingDishCodes() {
  const codes = new Set();
  document
    .querySelectorAll(".template-menu-wrapper .menu-code")
    .forEach((el) => {
      const text = el.textContent.trim();
      if (text) codes.add(text);
    });
  return codes;
}

// Async getting dishes
async function loadDishes() {
  const res = await fetch("app/database/get-dishes.php");
  if (!res.ok) throw new Error("Error while loading the dishes");
  return await res.json();
}

// Dish card
function createDishCard(dish) {
  const wrapper = document.createElement("div");
  wrapper.className = "dish-wrapper";
  wrapper.dataset.code = dish.code; // Store the dish code

  wrapper.innerHTML = `
    <span class="dish-code">${dish.code}</span>
    <div class="dish-meta">
      <span class="dish-name">${dish.name}</span>
      <span class="dish-description">${dish.description}</span>
    </div>
    <span class="dish-volume">${dish.weight}</span>
    <span class="dish-type">${dish.type}</span>
    <span class="workshop">${dish.workshop}</span>
    <button class="dish-add" title="Add dish to the selected menu">─</button>
  `;

  wrapper
    .querySelector(".dish-add")
    .addEventListener("click", () => toggleEditMode(wrapper));
  return wrapper;
}

function toggleEditMode(wrapper) {
  const addBtn = wrapper.querySelector(".dish-add");
  if (addBtn.textContent === "─") {
    addBtn.textContent = "+";
    addBtn.style.fontSize = "20px";
    addBtn.style.background = "green";
    wrapper.classList.add("selected-for-adding");
  } else {
    addBtn.textContent = "─";
    addBtn.style.background = "#00b0e1";

    wrapper.classList.remove("selected-for-adding");
  }

  // Show or hide the "ADD" button based on selection
  const selectedCount = document.querySelectorAll(
    ".dish-wrapper.selected-for-adding"
  ).length;
  if (selectedCount > 0) {
    addSelectedBtn.classList.add("visible");
    addSelectedBtn.innerHTML = `ADD DISHES FROM BASE <span class="dish-counter-wrapper">${selectedCount}</span>`;
  } else {
    addSelectedBtn.classList.remove("visible");
    addSelectedBtn.textContent = `ADD DISHES FROM BASE`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dishCounter = document.createElement("dishCounter");
  dishCounter.textContent = `
  .dish-counter-wrapper {
  opacity: 0;
  animation: dish-counter-animation 2.5s forwards;

  }

  @keyframes dish-counter-animation {
  0% {
  opacity: 0;
  filter:blur(28px);
  }

  100% {
  opacity: 1;
  filter:blur(0);

  }
  }

  `;
  const addButton = document.getElementById("addSelectedDishesBtn");

  // Ensure the event listener is only attached once
  addButton.addEventListener("click", function () {
    // Disable the button to prevent multiple clicks
    addButton.disabled = true;

    const selectedTemplate = localStorage.getItem("selectedTemplate");
    if (!selectedTemplate) {
      alert("No template selected");
      addButton.disabled = false; // Re-enable the button
      return;
    }

    const selectedDishes = Array.from(
      document.querySelectorAll(".dish-wrapper.selected-for-adding")
    ).map((wrapper) => wrapper.dataset.code);

    if (selectedDishes.length === 0) {
      alert("No dishes selected");
      addButton.disabled = false; // Re-enable the button
      return;
    }

    fetch("app/templates/add-dishes-to-template.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: selectedTemplate,
        dishes: selectedDishes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // let message = `Successfully added ${data.added} dishes.`;
          // if (data.skipped && data.skipped.length > 0) {
          //   message += `\nSkipped ${
          //     data.skipped.length
          //   } dishes already in the template: ${data.skipped.join(", ")}`;
          // }
          // if (data.errors && data.errors.length > 0) {
          //   message += `\nErrors: ${data.errors.join(", ")}`;
          // }
          // alert(message);
          closeModal();
          loadMenuData(selectedTemplate); // Refresh the menu
        }
        // else {
        //   alert(
        //     "Error adding dishes: " +
        //       (data.errors ? data.errors.join(", ") : "Unknown error")
        //   );
        // }
        addButton.disabled = false; // Re-enable the button
      })
      .catch((error) => {
        // console.error("Error:", error);
        // alert("An error occurred while adding dishes");
        addButton.disabled = false; // Re-enable the button even on error
      });
  });
});

// Search filtering function: id, title, type, producer

function filterDishes(e) {
  const val = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".dish-wrapper");
  const noResultMsg = document.querySelector(".no-results-message");

  let hasVisible = false;

  cards.forEach((card) => {
    const code = card.querySelector(".dish-code").textContent.toLowerCase();
    const name = card.querySelector(".dish-name").textContent.toLowerCase();
    const type = card.querySelector(".dish-type").textContent.toLowerCase();
    const workshop = card.querySelector(".workshop").textContent.toLowerCase();

    const matches =
      code.includes(val) ||
      name.includes(val) ||
      type.includes(val) ||
      workshop.includes(val);

    if (!matches) {
      // If card must be hidden
      if (!card.classList.contains("hidden")) {
        card.classList.add("hidden");
        card.addEventListener("animationend", function onHideEnd(e) {
          if (e.animationName === "hideCards") {
            card.style.display = "none";
            card.removeEventListener("animationend", onHideEnd);
            noResults();
          }
        });
      }
    } else {
      // If card must be shown 
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        // Setting display for animation
        card.style.display = "flex";
        card.style.animation = "showCards 0.8s ease-in-out forwards";
        card.addEventListener("animationend", function onShowEnd(e) {
          if (e.animationName === "showCards") {
            card.style.animation = "";
            card.removeEventListener("animationend", onShowEnd);
            noResults();
          }
        });
      }
      hasVisible = true;
    }
  });

  function noResults() {
    const visible = [...cards].some(
      (c) => !c.classList.contains("hidden") && c.style.display !== "none"
    );
    noResultMsg.style.display = visible ? "none" : "block";
  }

  noResults();
}


// Saving dates after pressing save button 

document.querySelector(".save").addEventListener("click", async function () {
  try {
    const selectedDate = document.getElementById("calendarInput").value;
    const selectedTemplateId = localStorage.getItem("selectedTemplate");

    const response = await fetch("app/settings/update-settings.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: selectedTemplateId,
        date: selectedDate,
      }),
    });

    const result = await response.json();

    if (result.success) {
      const dateSpan = document.getElementById(`${selectedTemplateId}-data`);
      if (dateSpan) {
        dateSpan.textContent = selectedDate;
      }

      const category = determineCategory(selectedTemplateId);
      renderHeader(category, selectedDate, selectedTemplateId);
    } else {
      alert(`Error during save: ${result.error}`);
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
});

function loadSettings(templateId) {
  fetch(`app/settings/get-settings.php?template=${templateId}`)
    .then((res) => res.json())
    .then((data) => {
      const date = data.menudata || "";
      const signatory = data.signatures || "";
      const menushow = data.menushow || false;

      // Updating dates in sidemenu
      const dateSpan = document.getElementById(`${templateId}-data`);
      if (dateSpan) {
        dateSpan.textContent = date;
      }

      // Updating title
      const category = determineCategory(templateId);
      renderHeader(category, date, templateId);

      // Setting date into  calendarInput
      document.getElementById("calendarInput").value = date;

      // Record signature into  dropdown
      const selector = document.getElementById("item-worker-selector");
      if (selector) {
        selector.value = signatory;
      }
    });
}

export let menushow;

// Getting dates of templates 

document.addEventListener("DOMContentLoaded", function () {
  const templates = [
    "template_dinner_1",
    "template_dinner_2",
    "template_dinner_3",
    "template_dinner_4",
    "template_dinner_5",
    "template_breakfast_1",
    "template_breakfast_2",
    "template_breakfast_3",
    "template_cafe_1",
    "template_cafe_2",
    "template_cafe_3",
    "template_cafe_4",
  ];

  // Requesting new dates
  fetch("app/settings/get-template-dates.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templates: templates }),
  })
    .then((response) => response.json())
    .then((data) => {
      templates.forEach((template) => {
        const dateElement = document.getElementById(`${template}-data`);

        if (dateElement) {
          setTimeout(() => {
            dateElement.innerText =
              data[template]?.date || "No available date";
          }, 50); // Delay

          dateElement.classList.add("fade-in");
        }
      });
    })
    .catch((error) => console.error("Error upon loading dates:", error));
});

function selectTemplate(templateId) {
  localStorage.setItem("selectedTemplate", templateId);
  highlightBadge(templateId);
  loadSettings(templateId);
  loadMenuData(templateId);
  exportSelectedTemplate = templateId; // name of the template goes to broadcast.js
  // Global visibility
  window.exportSelectedTemplate = exportSelectedTemplate;
}

// Adding signature fields
const addInputFields = () => {
  const wrapper = document.querySelector(".signature-wrapper");

  // Clear old content
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.lastChild);
  }

  let containerDivTitle = document.createElement("div");
  containerDivTitle.className = "signature-title";
  containerDivTitle.textContent = "main menu";
  wrapper.appendChild(containerDivTitle);

  // Positions
  const positions = ["Calculator", "Head of Department", "Owner"];

  // Three inputs render via loop
  for (let i = 0; i < 3; i++) {
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("signature-input-container");

    // Text field for position
    let firstInput = document.createElement("input");
    firstInput.type = "text";
    firstInput.value = positions[i];

    // Full name
    let secondInput = document.createElement("input");
    secondInput.type = "text";
    secondInput.placeholder = `Enter your full name`;


    containerDiv.appendChild(firstInput); // Position field
    containerDiv.appendChild(secondInput); // Full name field

    // Adding container to the main block 
    wrapper.appendChild(containerDiv);
  }
};

const addInputFieldsBake = () => {
  const wrapperBake = document.querySelector(".signature-wrapper-bakery");

  while (wrapperBake.firstChild) {
    wrapperBake.removeChild(wrapperBake.lastChild);
  }

  const positions = ["Calculator", "Head of Department", "Owner"];

  let containerDivTitleBake = document.createElement("div");
  containerDivTitleBake.className = "signature-title";
  containerDivTitleBake.textContent = "bakery on the menu";
  wrapperBake.appendChild(containerDivTitleBake);

  for (let i = 0; i < 3; i++) {
    let containerDivBake = document.createElement("div");
    containerDivBake.classList.add("signature-input-container-bake");

    let firstInputBake = document.createElement("input");
    firstInputBake.type = "text";
    firstInputBake.value = positions[i];

    let secondInputBake = document.createElement("input");
    secondInputBake.type = "text";
    secondInputBake.placeholder = `Enter your full name`;

    containerDivBake.appendChild(firstInputBake);
    containerDivBake.appendChild(secondInputBake);

    wrapperBake.appendChild(containerDivBake);
  }
};

addInputFields();
addInputFieldsBake();

// Modal window to add dishes into templates

const modal = document.getElementById("addDishes");
const content = modal.querySelector(".adding-modal-content");

function openModal() {
  modal.style.display = "flex";
  setTimeout(() => {
    content.style.opacity = 1;
    content.style.transform = "scale(1)";
  }, 10);

  document.body.classList.add("noScroll");
}

// Button for adding dishes in the modal window

let addSelectedBtn = document.getElementById("addSelectedDishesBtn");

function closeModal() {
  content.style.opacity = 0;
  content.style.transform = "scale(0.4)";

  // Clearing selected dish counter upon closing modal window

  const dishCounter = document.querySelector(".dish-counter-wrapper");
  if (dishCounter) {
    dishCounter.style.display = "none";
  }
  if (addSelectedBtn) {
    addSelectedBtn.classList.remove("visible");
    addSelectedBtn.textContent = "ADD DISHES FROM THE DATABASE";
  }

  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove("noScroll");
  }, 300);
}

addButton.addEventListener("click", openModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest(".close")) {
    closeModal();
  }
});

window.openModal = openModal;
window.closeModal = closeModal;

// Duplicate events tester (debug)
document.addEventListener("keydown", function (event) {
  console.log(`Key pressed: ${event.key}`);
});
