// Custom alerts
import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

// Hotkeys
import { handleKeyNavigation } from "../../tools/hotkeys.js";
handleKeyNavigation();

// Categories and types
import { typeAndCat } from "../../_main.js";

//  Producers
import { workShop } from "../../_main.js";

let dishes;



const API_BASE_URL = "https://meals-on-wheels-backend-fxio.onrender.com"; 


// Total dish counter
function countDishes() {
  const countOfDishes = document.querySelectorAll(".dish-wrapper").length;
  const countOfDishesOutput = document.getElementById("database-dish-quantity");
  countOfDishesOutput.textContent = `Total dish count: ${countOfDishes}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  const searchInput = document.getElementById("searchBar");
  const catalogueWrapper = document.querySelector(".dish-catalogue-wrapper");

  // List of dishes 
  dishes = await loadDishes();

  // Dish cards list
  for (const dish of dishes) {
    const wrapper = createDishCard(dish);
    catalogueWrapper.appendChild(wrapper);
  }

  countDishes();

  // Search Input field
  searchInput.addEventListener("input", filterDishes);
});

// Getting dishes from DB
async function loadDishes() {
  const response = await fetch("${API_BASE_URL}/app/database/get-dishes.php");

  return await response.json();
}

// Creation of dish cards
function createDishCard(dish) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("dish-wrapper");

  const codeSpan = document.createElement("span");
  codeSpan.classList.add("dish-code");
  codeSpan.title = "ID dish";
  codeSpan.textContent = dish.code;

  const metaDiv = document.createElement("div");
  metaDiv.classList.add("dish-meta");

  const nameSpan = document.createElement("span");
  nameSpan.classList.add("dish-name");
  nameSpan.textContent = dish.name;

  const descSpan = document.createElement("span");
  descSpan.classList.add("dish-description");
  descSpan.style.fontWeight = "900";
  descSpan.style.borderRadius = "8px";
  descSpan.style.padding = "4px";
  descSpan.style.fontSize = "11px";
  descSpan.title = "Ingredients";
  descSpan.textContent = dish.description;

  metaDiv.append(nameSpan, descSpan);

  const volumeSpan = document.createElement("span");
  volumeSpan.classList.add("dish-volume");
  volumeSpan.title = "Quantity";
  volumeSpan.textContent = dish.weight;

  const typeSpan = document.createElement("span");
  typeSpan.classList.add("dish-type");
  typeSpan.title = "Dish type";
  typeSpan.textContent = dish.type;

  const workshopSpan = document.createElement("span");
  workshopSpan.classList.add("dish-workshop");
  workshopSpan.title = "Producer";
  workshopSpan.textContent = dish.workshop;

  const editBtn = document.createElement("button");
  editBtn.classList.add("dish-edit");
  // editBtn.textContent = "Edit";
  editBtn.title = "Edit dish";

  const editIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.9 595.3" fill="white" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve"><g><polygon points="280.2,575.9 127.1,611.8 163,458.8 621.8,0 739,117.2 "/></g>
</svg>`;

  editBtn.innerHTML = editIcon;

  wrapper.append(
    codeSpan,
    metaDiv,
    volumeSpan,
    typeSpan,
    workshopSpan,
    editBtn
  );

  // Sorting from small to big 
  // Collator instead of localCompare

  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  function updateCatalogue(sortFn) {
    const catalogueWrapper = document.querySelector(".dish-catalogue-wrapper");

    catalogueWrapper.classList.add("is-sorting");

    // Wait for fadeout
    setTimeout(() => {
      sortFn(); // Sort

      // Clear and render
      catalogueWrapper
        .querySelectorAll(".dish-wrapper")
        .forEach((el) => el.remove());

      const fragment = document.createDocumentFragment();
      dishes.forEach((dish) => fragment.appendChild(createDishCard(dish)));
      catalogueWrapper.appendChild(fragment);

      catalogueWrapper.classList.remove("is-sorting");
      countDishes();
    }, 300);
  }

  function sortDishesAsc() {
    document
      .querySelector(".menu-icon-angle__down")
      .classList.remove("active-sort");
    document.querySelector(".menu-icon-angle__up").classList.add("active-sort");

    // Sort
    updateCatalogue(() => {
      dishes.sort((a, b) => collator.compare(String(a.code), String(b.code)));
    });
  }

  function sortDishesDesc() {
    document
      .querySelector(".menu-icon-angle__up")
      .classList.remove("active-sort");
    document
      .querySelector(".menu-icon-angle__down")
      .classList.add("active-sort");

    // Sort
    updateCatalogue(() => {
      dishes.sort((a, b) => collator.compare(String(b.code), String(a.code)));
    });
  }

  // Sort upon click
  document.querySelector(".menu-icon-angle__up").onclick = sortDishesAsc;
  document.querySelector(".menu-icon-angle__down").onclick = sortDishesDesc;

  // Edit button
  editBtn.addEventListener("click", () => {
    toggleEditMode(wrapper);
  });

  wrapper.dataset.id = dish.id; // direct editing of the code, because it is binded to id

  return wrapper;
}

function cleanupOldSelectors(wrapper) {
  const oldTs = wrapper.querySelector(".dish-type-select");
  if (oldTs) {
    oldTs.remove();
    wrapper.querySelector(".dish-type").style.display = "";
  }

  const oldWs = wrapper.querySelector(".workshop-select");
  if (oldWs) {
    oldWs.remove();
    wrapper.querySelector(".dish-workshop").style.display = "";
  }
}

// Dish edit button 
function toggleEditMode(wrapper) {
  const elements = wrapper.querySelectorAll("span");
  const codeSpan = wrapper.querySelector(".dish-code");
  document.body.classList.add("no-scroll"); // Adding no scroll
  document.getElementById("scrollTopMain").style.display = "none"; // Hiding scroll top button

  if (!wrapper.hasAttribute("dish-editing")) {
    // — mark everything except this wrapper as inactive/blurred
    document.body.classList.add("editing-active");
    wrapper.classList.add("editing-wrapper");

    // Backdrop for blur
    const backdrop = document.createElement("div");
    backdrop.className = "edit-mode-backdrop show-backdrop";
    document.body.appendChild(backdrop);

    cleanupOldSelectors(wrapper);


    // Edit mode
    elements.forEach((el) => {
      el.setAttribute("contenteditable", true);
      el.dataset.originalValue = el.textContent;
    });
    // ——— TYPE dropdown ———————————————————————————————————
    const typeSpan = wrapper.querySelector(".dish-type");
    const typeSelect = document.createElement("select");
    typeSelect.classList.add("dish-type-select");
    typeSelect.id = "dishTypeSelect";

    // data from _main.js

    typeSelect.append(
      ...Object.keys(typeAndCat).map((opt) => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        if (opt === typeSpan.textContent) option.selected = true;
        return option;
      })
    );


    typeSpan.style.display = "none";
    typeSpan.insertAdjacentElement("afterend", typeSelect);
    createCustomSelect("dishTypeSelect");

    // ——— WORKSHOP dropdown ——————————————————————————————
    const wsSpan = wrapper.querySelector(".dish-workshop");
    const wsSelect = document.createElement("select");
    wsSelect.classList.add("workshop-select");
    wsSelect.id = "workshopSelect";

 // data from _main.js

    workShop.forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      if (opt === wsSpan.textContent) o.selected = true;
      wsSelect.append(o);
    });

    wsSpan.style.display = "none";
    wsSpan.insertAdjacentElement("afterend", wsSelect);
    createCustomSelect("workshopSelect");

    codeSpan.addEventListener("input", validateDishCode); // Max 5 digits
    codeSpan.addEventListener("keydown", restrictToNumbers); // Blocking text symbols

    wrapper.setAttribute("dish-editing", "");
    addActionButtons(wrapper);
  } else {
    elements.forEach((el) => {
      el.removeAttribute("contenteditable");
      if (el.classList.contains("dish-code")) {
        el.removeEventListener("input", validateDishCode);
        el.removeEventListener("keydown", restrictToNumbers);
      }
    });

    wrapper.removeAttribute("dish-editing");
    removeActionButtons(wrapper);
    document.body.classList.remove("no-scroll");

    // unblur & re-enable interaction globally
    document.body.classList.remove("editing-active");
    wrapper.classList.remove("editing-wrapper");

    // Find and remove blurs
    const backdrop = document.querySelector(".edit-mode-backdrop");
    if (backdrop) {
      document.getElementById("scrollTopMain").style.display = "flex"; // returning scroll button
      backdrop.classList.replace("show-backdrop", "hide-backdrop");
      setTimeout(() => {
        backdrop.remove();
      }, 300);
    }
  }
}

function restrictToNumbers(event) {
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
  if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}

function validateDishCode(event) {
  const codeSpan = event.target;

  // Remove any non-digits (as a safeguard, though restrictToNumbers should prevent them)
  let text = codeSpan.textContent.replace(/\D/g, "");

  // Limit to 5 digits
  if (text.length > 5) {
    text = text.slice(0, 5);
  }

  // Update the span's content
  codeSpan.textContent = text;

  // Dish Duplicate check 
  const wrapper = codeSpan.closest(".dish-wrapper");
  const myId = wrapper.dataset.id;
  const isDuplicate = dishes.some(
    (d) => d.code === text && String(d.id) !== myId
  );
  const saveBtn = wrapper.querySelector(
    'button[title="Add changes to the database"]'
  );
  if (isDuplicate) {
    codeSpan.style.outline = "2px solid red";
    saveBtn.disabled = true;
  } else {
    codeSpan.style.outline = "";
    saveBtn.disabled = false;
  }

  // Position the cursor at the end after modification
  const range = document.createRange();
  range.selectNodeContents(codeSpan);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopImmediatePropagation(); // prevents another handles

    let editingWrappers = document.querySelectorAll("[dish-editing]");
    editingWrappers.forEach(function (wrapper) {
      wrapper.classList.add("card-edit-fade-out-tv");
      wrapper.addEventListener(
        "animationend",
        function () {
          // Clean up selects if they exist
          const typeSelect2 = wrapper.querySelector(".dish-type-select");
          const spanType = wrapper.querySelector(".dish-type");
          if (typeSelect2 && spanType) {
            typeSelect2.value = spanType.dataset.originalValue;
            spanType.textContent = typeSelect2.value;
            const typeCustom = typeSelect2.parentNode.classList.contains(
              "custom-select"
            )
              ? typeSelect2.parentNode
              : typeSelect2;
            typeCustom.remove();
            spanType.style.display = "";
          }

          const wsSelect2 = wrapper.querySelector(".workshop-select");
          const spanWS = wrapper.querySelector(".dish-workshop");
          if (wsSelect2 && spanWS) {
            wsSelect2.value = spanWS.dataset.originalValue;
            spanWS.textContent = wsSelect2.value;
            const wsCustom = wsSelect2.parentNode.classList.contains(
              "custom-select"
            )
              ? wsSelect2.parentNode
              : wsSelect2;
            wsCustom.remove();
            spanWS.style.display = "";
          }

          const elements = wrapper.querySelectorAll("span");
          elements.forEach((el) => {
            el.removeAttribute("contenteditable");
            if (el.classList.contains("dish-code")) {
              el.removeEventListener("input", validateDishCode);
              el.removeEventListener("keydown", restrictToNumbers);
            }
            // Restore original value if available
            if (el.dataset.originalValue !== undefined) {
              el.textContent = el.dataset.originalValue;
            }
          });

          wrapper.removeAttribute("dish-editing");
          removeActionButtons(wrapper);
          document.body.classList.remove("no-scroll");
          document.body.classList.remove("editing-active");
          wrapper.classList.remove("editing-wrapper");

          wrapper.classList.remove("card-edit-fade-out-tv");

          // Remove backdrop
          const backdrop = document.querySelector(".edit-mode-backdrop");
          if (backdrop) {
            backdrop.classList.replace("show-backdrop", "hide-backdrop");
            setTimeout(() => backdrop.remove(), 400);
          }
        },
        { once: true }
      );
    });
  }
});

// Action bar in edit modal mode 
function addActionButtons(wrapper) {
  const actionBar = document.createElement("div");
  actionBar.classList.add("action-bar");

  const saveBtn = document.createElement("button");
  // saveBtn.textContent = "Ok";

  const okIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.9 595.3" fill="green" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve"> <path d="M428.5,612.9L7.9,276.8c-17.3-13.8-20.1-39-6.3-56.2c13.8-17.3,39-20.1,56.2-6.3l355.5,284.1L776.7,4.9 c13.1-17.8,38.1-21.6,55.9-8.5c17.8,13.1,21.6,38.1,8.5,55.9L428.5,612.9z"/>
</svg>`;

  saveBtn.innerHTML = okIcon;

  saveBtn.title = "Write changes to the database";
  saveBtn.onclick = async () => {
    const updatedData = collectUpdatedData(wrapper);
    const success = await submitUpdates(updatedData);
    if (success) {
      await ConfirmDialog.show({
        text: "Dish has been successfully changed!",
        success: true,
        okText: "Done",
        useCancel: false,
      });
      finalizeDropdownEdits(wrapper); // Dropdown collapse
      toggleEditMode(wrapper);
    } else {
      await ConfirmDialog.show({
        text: "Error upon adding the data.<br> Dish with such ID is already in the database!",
        error: true,
        okText: "Close",
        useCancel: false,
      });
    }
  };

  const cancelBtn = document.createElement("button");

  // cancelBtn.textContent = "X";

  cancelBtn.title =
    "Cancel all changes and return to the defaults [ESC]";

  const restoreIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.9 595.3" fill="orange" style="enable-background:new 0 0 841.9 595.3; " xml:space="preserve"> <path d="M477.6,300l215-215c15.6-15.6,15.6-40.9,0-56.6s-40.9-15.6-56.6,0l-215,215l-215-215c-15.6-15.6-40.9-15.6-56.6,0 s-15.6,40.9,0,56.6l215,215l-215,215c-15.6,15.6-15.6,40.9,0,56.6c7.8,7.8,18,11.7,28.3,11.7s20.5-3.9,28.3-11.7l215-215l215,215 c7.8,7.8,18,11.7,28.3,11.7s20.5-3.9,28.3-11.7c15.6-15.6,15.6-40.9,0-56.6L477.6,300z"/>
</svg>`;

  cancelBtn.innerHTML = restoreIcon;

  cancelBtn.onclick = () => {
    wrapper.classList.add("card-edit-fade-out-tv");
    // wrapper.classList.add("card-edit-fade-out");
    wrapper.addEventListener(
      "animationend",
      () => {
        const typeSpan = wrapper.querySelector(".dish-type");
        const typeSelect = wrapper.querySelector(".dish-type-select");
        if (typeSelect) typeSelect.value = typeSpan.dataset.originalValue;

        const wsSpan = wrapper.querySelector(".dish-workshop");
        const wsSelect = wrapper.querySelector(".workshop-select");
        if (wsSelect) wsSelect.value = wsSpan.dataset.originalValue;

        finalizeDropdownEdits(wrapper);
        restoreOriginalValues(wrapper); // Restoring default values
        toggleEditMode(wrapper);
        wrapper.classList.remove("card-edit-fade-out-tv");
        // wrapper.classList.remove("card-edit-fade-out");
      },
      { once: true }
    );
  };

  const deleteBtn = document.createElement("button");
  // deleteBtn.textContent = "D";
  deleteBtn.title = "Permanetly remove from the database";

  const trashIcon = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 841.9 595.3" fill="red" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve"><g><path d="M112.1,13.1l72.7,719h236.2h236.2l72.7-719h-309H112.1z M200.6,93.1h175.5v559H257.1L200.6,93.1z M585,652.1H459.1v-559
	h182.4L585,652.1z"/> <rect x="112.1" y="500" width="617.9" height="83"/> </g></svg>`;

  deleteBtn.innerHTML = trashIcon;

  deleteBtn.onclick = async () => {
    try {
      const confirmed = await ConfirmDialog.show({
        text: "Do you confirm the removal of the dish?",
        error: true,
        okText: "Delete",
        cancelText: "Cancel",
      });

      if (confirmed) {
        const code = wrapper.querySelector(".dish-code").textContent;
        const deleted = await deleteDish(code);
        if (deleted) {
          // Inactive elements overlays cleanup
          document.body.classList.remove("no-scroll");
          document.body.classList.remove("editing-active");
          wrapper.classList.remove("editing-wrapper");

          document
            .querySelectorAll(".edit-mode-backdrop")
            .forEach((backdrop) => {
              backdrop.remove();
              document.getElementById("scrollTopMain").style.display = "flex"; // Returning scroll top button
            });
          wrapper.classList.add("deleting");
          wrapper.addEventListener(
            "animationend",
            () => {
              wrapper.remove();
              countDishes(); // Update quantity of the dishes in the database
            },
            { once: true }
          );
        }
      }
    } catch (err) {
      console.error("Error upon deletion:", err);
    }
  };

  actionBar.append(saveBtn, cancelBtn, deleteBtn);
  wrapper.append(actionBar);
}

// Collapse dropdowns upon clicking Save or Cancel

function finalizeDropdownEdits(wrapper) {
  const typeSelect = wrapper.querySelector(".dish-type-select");
  const typeSpan = wrapper.querySelector(".dish-type");
  if (typeSelect) {
    typeSpan.textContent = typeSelect.value;
    typeSpan.style.display = "";
    const typeCustom = typeSelect.parentNode.classList.contains("custom-select")
      ? typeSelect.parentNode
      : typeSelect;
    typeCustom.remove();
  }

  const wsSelect = wrapper.querySelector(".workshop-select");
  const wsSpan = wrapper.querySelector(".dish-workshop");
  if (wsSelect) {
    wsSpan.textContent = wsSelect.value;
    wsSpan.style.display = "";
    const wsCustom = wsSelect.parentNode.classList.contains("custom-select")
      ? wsSelect.parentNode
      : wsSelect;
    wsCustom.remove();
  }
}

// Collecting data from editable fields
function collectUpdatedData(wrapper) {
  const data = {
    id: wrapper.dataset.id, // Collect id
    code: wrapper.querySelector(".dish-code").textContent,
    name: wrapper.querySelector(".dish-name").textContent,
    description: wrapper.querySelector(".dish-description").textContent,
    weight: wrapper.querySelector(".dish-volume").textContent,
    type:
      wrapper.querySelector(".dish-type-select")?.value ||
      wrapper.querySelector(".dish-type").textContent,
    workshop:
      wrapper.querySelector(".workshop-select")?.value ||
      wrapper.querySelector(".dish-workshop").textContent,
  };
  return data;
}

// Sending changes to the server
async function submitUpdates(data) {
  try {
    const response = await fetch("app/database/update-dish.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });

    const result = await response.json();
    if (result.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    alert("Error sending the data: " + error.message);
    return false;
  }
}

// Dish removal 
async function deleteDish(code) {
  try {
    const response = await fetch("app/database/delete-dish.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${encodeURIComponent(code)}`,
    });

    const result = await response.json();
    if (result.success) {
      // alert("Element was successfully removed from the database.");
      return true;
    } else {
      alert("Error upon deletion.");
      return false;
    }
  } catch (error) {
    alert("Error upon deletion: " + error.message);
    return false;
  }
}

// Restoring original values
function restoreOriginalValues(wrapper) {
  const elements = wrapper.querySelectorAll("span");
  elements.forEach((el) => {
    if (el.dataset.originalValue !== undefined) {
      el.textContent = el.dataset.originalValue;
      el.dataset.originalValue = "";
    }
  });
}

// Removal of action bar
function removeActionButtons(wrapper) {
  const actionBar = wrapper.querySelector(".action-bar");
  if (actionBar) {
    actionBar.remove();
  }
}

// Filtering dishes by code, title, type and producer

function filterDishes(e) {
  const val = e.target.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".dish-wrapper");
  const noResultMsg = document.querySelector(".no-results-message");

  let hasVisible = false;

  cards.forEach((card) => {
    const code = card.querySelector(".dish-code").textContent.toLowerCase();
    const name = card.querySelector(".dish-name").textContent.toLowerCase();
    const type = card.querySelector(".dish-type").textContent.toLowerCase();
    const workshop = card
      .querySelector(".dish-workshop")
      .textContent.toLowerCase();

    const matches =
      code.includes(val) ||
      name.includes(val) ||
      type.includes(val) ||
      workshop.includes(val);

    if (!matches) {
      // If dish card must be hidden 
      if (!card.classList.contains("hidden")) {
        card.classList.add("hidden");
        // After animation remove from the flow
        card.style.animation = "hideCards 0.8s ease-in-out forwards";
        card.addEventListener("animationend", function onHideEnd(e) {
          if (e.animationName === "hideCards") {
            card.style.display = "none";
            card.removeEventListener("animationend", onHideEnd);
            noResults();
          }
        });
      }
    } else {
      // If dish card must be shown
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        // Returning display for animation to work
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
      (с) => !с.classList.contains("hidden") && с.style.display !== "none"
    );
    noResultMsg.style.display = visible ? "none" : "block";
  }

  noResults();
}


// Emulation of text typing in the search field
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchBar");
  const placeholderText =
    "Start typing name of the dish, id, type, or producer ... to clear search field press [ESC]";
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

function createCustomSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");

  const selected = document.createElement("div");
  selected.classList.add("selected");

  // Initial text 
  selected.textContent = select.options[select.selectedIndex].text;
  selected.setAttribute("tabindex", "0");
  customSelect.appendChild(selected);

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");
  customSelect.appendChild(optionsContainer);

  // Loop through records excluding value="" 
  for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];
    if (option.value === "") continue; 

    const optionDiv = document.createElement("div");
    optionDiv.classList.add("option");
    optionDiv.textContent = option.text;
    optionDiv.dataset.value = option.value;

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

// Duplicate events tester
document.addEventListener("keydown", function (event) {
  console.log(`Key pressed: ${event.key}`);
});
