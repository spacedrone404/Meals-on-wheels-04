document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".top-menu-wrapper li a").forEach((link) => {
    link.classList.remove("active");
  });

  const currentLink = [
    ...document.querySelectorAll(".top-menu-wrapper li a"),
  ].find((link) => link.href === window.location.href);


  if (currentLink) {
    currentLink.classList.add("active");
  } else {
    const startPageLink = document.querySelector(
      ".top-menu-wrapper .start-page"
    );
    if (startPageLink) {
      startPageLink.classList.add("active");
    }
  }
});
