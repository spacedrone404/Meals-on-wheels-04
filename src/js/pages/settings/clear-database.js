import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

document
      .getElementById("clearDatabase")
      .addEventListener("click", async () => {
        try {
    
          const result = await ConfirmDialog.show({
            text: "ALL DATABASE WILL BE PURGED COMPLETELY!!!<br>Would you like to continue?",
            warning: true,
            okText: "Yes, clear",
            cancelText: "No, cancel",
          });

          if (result === true) {
            purgeDatabase();
          }
        } catch (err) {
          console.error("Error showing context:", err);
        }
      });


function purgeDatabase() {
    fetch("app/database/truncate.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "truncate"}),
    })
}




