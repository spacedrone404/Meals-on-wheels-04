function handleScrollLogic(btn, container) {
  // For window, we use scrollY; for elements, we use scrollTop
  let currentScroll =
    container === window ? window.scrollY : container.scrollTop;

  if (currentScroll > 384) {
    if (!btn.classList.contains("show")) {
      btn.classList.remove("hide");
      btn.classList.add("show");
    }
  } else {
    if (btn.classList.contains("show")) {
      btn.classList.remove("show");
      btn.classList.add("hide");
    }
  }
}

// Main index page scroller
const mainBtn = document.getElementById("scrollTopMain");
window.addEventListener("scroll", () => {
  if (mainBtn) handleScrollLogic(mainBtn, window);
});

// Modal scroller
const modalBtn = document.getElementById("scrollTopModal");
const modalContainer = document.querySelector(
  "#addDishes .adding-modal-content"
);

if (modalContainer) {
  modalContainer.addEventListener("scroll", () => {
    if (modalBtn) handleScrollLogic(modalBtn, modalContainer);
  });
}

function topFunction(id) {
  if (id === "scrollTopMain") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (id === "scrollTopModal") {
    const modal = document.querySelector("#addDishes .adding-modal-content");
    if (modal) {
      modal.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

// Needed for inline onclick
window.topFunction = topFunction;
