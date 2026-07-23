
//  true ->  menushow in table settings

async function sendBroadcastRequest(menuname) {
  try {
    const response = await fetch(
      `/app/templates/broadcast.php?menuname=${menuname}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuname }),
      }
    );

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const result = await response.json();
    console.log("Result:", result);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

function addBroadcastIndicator(templateName) {
  const ifBroadcasted = document.getElementById("broadcasted");
  if (ifBroadcasted) {
    ifBroadcasted.remove();
  }

  const broadcastedDiv = document.querySelector(
    `.template-badge[data-table="${templateName}"]`
  );
  const broadcasted = broadcastedDiv.parentNode.appendChild(
    document.createElement("p")
  );
  broadcasted.id = "broadcasted";
  broadcasted.classList.add("broadcast-bounce");
  broadcasted.title =
    "This template is being broadcasted right now,to broadcast another template select different one and press [F8] key or [Broadcast ₪] button";
  broadcasted.addEventListener(
    "mouseenter",
    () => (broadcasted.style.cursor = "pointer")
  );
  broadcasted.innerHTML = " ₪";
}

async function loadLastActiveTemplate() {
  try {
    const response = await fetch("/app/templates/broadcast.php");
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    if (data.active_menu && data.active_menu.menuname) {
      addBroadcastIndicator(data.active_menu.menuname);
    }
  } catch (err) {
    console.error("Error loading active template:", err.message);
  }
}

document.getElementById("item-0").addEventListener("click", async () => {
  console.log(`Sending true in ${window.exportSelectedTemplate}`);

  addBroadcastIndicator(window.exportSelectedTemplate);

  await sendBroadcastRequest(window.exportSelectedTemplate);
});


window.addEventListener("load", loadLastActiveTemplate); 
