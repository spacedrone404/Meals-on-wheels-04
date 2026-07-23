const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0"); // months index start from 0
const year = today.getFullYear();
const formattedDate = `${day}.${month}.${year}`;
document.querySelector("#date").textContent = "╚" + " " + formattedDate;
