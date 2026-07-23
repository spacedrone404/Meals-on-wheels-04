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

function xlspathEnabled(enabled) {
  const versionElements = document.querySelectorAll(".xls-path");
  versionElements.forEach((el) => {
    if (!enabled) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("xlsToggle");

  if (checkbox) {
    // Restore state from cookie
    const savedState = getCookie("xlspathEnabled");
    if (savedState === "true") {
      checkbox.checked = true;
      xlspathEnabled(true);
    } else {
      checkbox.checked = false;
      xlspathEnabled(false);
    }

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        xlspathEnabled(true);
        setCookie("xlspathEnabled", "true", 30);
      } else {
        xlspathEnabled(false);
        setCookie("xlspathEnabled", "false", 30);
      }
    });
  }
});
