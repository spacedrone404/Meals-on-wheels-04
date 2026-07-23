import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

document
      .getElementById("clearTempCookies")
      .addEventListener("click", async () => {
        try {
    
          const result = await ConfirmDialog.show({
            text: "Cookies files will be removed from the local computer <br> Would you like to continue?",
            warning: true,
            okText: "Yes, remove",
            cancelText: "No, cancel",
          });
    
          if (result === true) {
            deleteAllCookies();        
          }
        } catch (err) {
          console.error("Error showing dialog:", err);
        }
      });


function deleteAllCookies() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookieName = cookies[i].trim().split("=")[0]; // cookies names

    // Setting new empty cookie with a past date, also setting root to affect entire website
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost`;
  }
}

