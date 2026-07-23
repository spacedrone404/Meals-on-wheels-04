import { ConfirmDialog } from "../../../includes/custom-dialog/custom-dialog.js";

document
      .getElementById("inject2Database")
      .addEventListener("click", async () => {
        try {
    
          const result = await ConfirmDialog.show({
            text: "We will load data from  2BASE.XLSX to the database <br> Would you like to continue?",
            success: true,
            okText: "Yes, load",
            cancelText: "No , cancel",
          });
    
          if (result === true) {
            injectDatabase();        
          }
        } catch (err) {
          console.error("Error on showing context:", err);
        }
      });



function injectDatabase() {
    fetch("app/database/inject-xls.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "inject"}),
    })
}




