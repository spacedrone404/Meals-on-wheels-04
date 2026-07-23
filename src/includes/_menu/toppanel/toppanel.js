
function reloadPage() {
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  const buttonReload = document.getElementById("buttonReload");
  if (buttonReload) {
    buttonReload.addEventListener("click", reloadPage);
  }
});
