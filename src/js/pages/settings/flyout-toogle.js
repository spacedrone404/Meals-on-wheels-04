function toggleSidePanel(enabled) {
  const sidePanel = document.getElementById("side-panel");

  if (!sidePanel) return;

  if (enabled) {
    sidePanel.classList.remove("hidden");
  } else {
    sidePanel.classList.add("hidden");
  }
}

function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const decodedCookies = decodeURIComponent(document.cookie).split(";");
  for (const cookie of decodedCookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(cookieName)) {
      return trimmedCookie.slice(cookieName.length);
    }
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  const flyoutTrigger = document.getElementById("flyoutToggle");
  const savedState = getCookie("sidePanelEnabled");
  const enabled = savedState === "true";

  toggleSidePanel(enabled);

  if (flyoutTrigger) {
    flyoutTrigger.checked = enabled;

    flyoutTrigger.addEventListener("change", () => {
      const newEnabled = flyoutTrigger.checked;
      toggleSidePanel(newEnabled);
      setCookie("sidePanelEnabled", newEnabled ? "true" : "false");
    });
  }
});
