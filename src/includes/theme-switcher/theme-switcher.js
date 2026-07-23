const toggleBtn = document.getElementById("themeToggle");
const body = document.body;
const THEME_KEY = "theme";

function applyTheme(theme) {
  body.classList.remove("light", "dark");
  body.classList.add(theme);
}

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("dark"); // Default theme
  localStorage.setItem(THEME_KEY, "dark");
}

function toggleTheme() {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

toggleBtn.addEventListener("click", toggleTheme);

// Hotkey  [CTRL] + [L]
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    toggleTheme();
  }
});
