// Новогодняя гирлянда появляющаяся 29, 30, 31 декабря и 1 января

const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();

if (
  (month === 12 && date === 29) ||
  (month === 12 && date === 30) ||
  (month === 12 && date === 31) ||
  (month === 1 && date === 1)
) {
  document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.querySelector(".ny-blobs");
    const numberOfStars = 48;
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("glowing-blobs");
      star.style.left = Math.random() * 100 + "vw";
      star.style.animationDuration = 5 + Math.random() * 5 + "s";
      star.style.animationDelay = Math.random() * 10 + "s";
      starContainer.appendChild(star);
    }
  });

  function setRandomBackground() {
    const colors = [
      "#ffd7d5",
      "#ffe9d6",
      "#ffffd1",
      "#d6ffda",
      "#d7eeff",
      "#dad6ff",
      "#ffd6e8",
      "#f5f5dc",
      "#f4e4e4",
      "#e4e6f4",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty("--main-bg-color", randomColor);
  }

  setRandomBackground();
}
