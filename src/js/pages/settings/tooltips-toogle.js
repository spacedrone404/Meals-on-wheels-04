function toggleTooltips(enabled) {
  const tooltipElements = document.querySelectorAll(".tooltip-text");

  if (!enabled) {
    tooltipElements.forEach((el) => el.classList.add("hidden"));
  } else {
    tooltipElements.forEach((el) => el.classList.remove("hidden"));
  }
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const decodedCookies = decodeURIComponent(document.cookie).split(";");
  for (const cookie of decodedCookies) {
    let trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(cookieName)) {
      return trimmedCookie.slice(cookieName.length);
    }
  }
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("tooltipsToggle");
  const savedState = getCookie("tooltipsEnabled");
  const enabled = savedState === "true";

  toggleTooltips(enabled);

  if (checkbox) {
    checkbox.checked = enabled;
  checkbox.addEventListener("change", () => {
    const newEnabled = checkbox.checked;
    toggleTooltips(newEnabled);
    setCookie("tooltipsEnabled", newEnabled ? "true": "false");
  });    
  }
});
