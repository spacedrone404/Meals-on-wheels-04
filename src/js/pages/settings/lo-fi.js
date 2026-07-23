const body = document.body;

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + d.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const eq = name + "=";
  const parts = document.cookie.split(";");
  for (let c of parts) {
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(eq) === 0) return c.substring(eq.length);
  }
  return null;
}

(function () {
  const toggle = document.getElementById("efxToggle");
  const isLofi = getCookie("lofi-mode") === "true";

  if (isLofi) {
    body.classList.add("lo-fi-mode");
  }

  if (toggle) {
    if (isLofi) {
      toggle.checked = true;
    }

    toggle.addEventListener("change", function () {
      if (this.checked) {
        body.classList.add("lo-fi-mode");
        setCookie("lofi-mode", "true", 30);
      } else {
        body.classList.remove("lo-fi-mode");
        setCookie("lofi-mode", "false", 30);
      }
    });
  }
})();
