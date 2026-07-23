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

function toggleVersionInfo(enabled) {
  const versionElements = document.querySelectorAll(".image-tooltip-ver");
  versionElements.forEach((el) => {
    if (!enabled) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("versionToggle");

  if (checkbox) {
    // Restore state from cookie
    const savedState = getCookie("versionInfoEnabled");
    if (savedState === "true") {
      checkbox.checked = true;
      toggleVersionInfo(true);
    } else {
      checkbox.checked = false;
      toggleVersionInfo(false);
    }

    // Handle checkbox change
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        toggleVersionInfo(true);
        setCookie("versionInfoEnabled", "true", 30);
      } else {
        toggleVersionInfo(false);
        setCookie("versionInfoEnabled", "false", 30);
      }
    });
  }
});
