const trigger = document.querySelector("flyout-trigger");
// const trigger = document.getElementById("side-panel");
const children = document.querySelectorAll("body > :not(#side-panel)");

trigger.addEventListener("mouseenter", () => {
  children.forEach((el) => {
    el.style.filter = "blur(8px)";
    el.style.transition = "filter 0.4s ease-in-out";
    el.style.pointerEvents = "none";
  });
});

trigger.addEventListener("mouseleave", () => {
  children.forEach((el) => {
    el.style.filter = "blur(0)";
    el.style.transition = "filter 0.4s ease-in-out";
    el.style.pointerEvents = "auto";
  });
});
