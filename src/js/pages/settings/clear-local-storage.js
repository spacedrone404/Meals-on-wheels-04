import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

document
      .getElementById("clearLocalStorage")
      .addEventListener("click", async () => {
        try {
    
          const result = await ConfirmDialog.show({
            text: "LocalStorage will be purged! <br> Would you like to continue?",
            warning: true,
            okText: "Yes, clear",
            cancelText: "No, cancel",
          });
    
          if (result === true) {
            deleteLocalStorage();        
          }
        } catch (err) {
          console.error("Error showing context:", err);
        }
      });


function deleteLocalStorage() {
const clearLocalStorage = document.getElementById("clearLocalStorage");

clearLocalStorage.addEventListener("click", () => {
  localStorage.clear();

  });
}





