document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#printButton")
    .addEventListener("click", printContent);
});

function printContent() {
  const contentToPrint = document.querySelector(".print-wr");

  if (!contentToPrint)
    return console.error('Class ".print-wr" not found.');

  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = contentToPrint.outerHTML;

  const menuItems = tempDiv.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    const code = item.querySelector(".menu-code");
    const info = item.querySelector(".menu-info");
    const volume = item.querySelector(".menu-volume");
    const price = item.querySelector(".menu-price");

    if (code && info && volume && price) {
      item.innerHTML = "";

      item.appendChild(volume);
      item.appendChild(info);
      item.appendChild(code);
      item.appendChild(price);
    }
  });

  let screenWidth = window.screen.width,
    screenHeight = window.screen.height,
    width = 1280,
    height = 880,
    left = Math.round(screenWidth / 2 - width / 2),
    top = Math.round(screenHeight / 2.8 - height / 2.8);

  let win = window.open(
    "",
    "_blank",
    `toolbar=no,location=no,status=no,menuBar=no,resizable=no,width=${width},height=${height},top=${top},left=${left}`
  );

  win.document.write("<html><head>");
  win.document.write("<title>Main menu print out</title>");

  const templateId = localStorage.getItem("selectedTemplate");
  const selectedTemplate = localStorage.getItem("selectedTemplate");
  const templatesMap = {
    template_dinner_1: "DINNER",
    template_dinner_2: "DINNER",
    template_dinner_3: "DINNER",
    template_dinner_4: "DINNER",
    template_dinner_5: "DINNER",
    template_breakfast_1: "BREAKFAST",
    template_breakfast_2: "BREAKFAST",
    template_breakfast_3: "BREAKFAST",
    template_cafe_1: "CAFETERIUM",
    template_cafe_2: "CAFETERIUM",
    template_cafe_3: "CAFETERIUM",
    template_cafe_4: "CAFETERIUM",
    template_cafe_5: "CAFETERIUM",
  };

  const dateElement = document.getElementById(`${selectedTemplate}-data`);
  const selectedDate = dateElement
    ? dateElement.textContent
    : "Date is not set";
  win.document.write(`<div class="header-date">MENU ${selectedDate}</div>`);


  win.document.write(
    `<style>           
        body{
            background-color:rgb(255, 255, 255);
            // filter: saturate(0);
          }


        .print-header {
          position: absolute;
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          margin: 0 auto;
          top: -2px; 
          left: 0;
          right: 0;
          font-weight: 900;
          font-size: 14px;
          color: red;
        }

        .header-text {
          position: relative; 
          height: 12px; 
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .header-text li {
          position: absolute;
          top: 50%; 
          transform: translateY(-50%);
          font-size: 16px;
          font-weight: 900;
        }

        .item-weight {
          left: 0%;
        }
        .item-dish {
          left: 11%;
        }
        .item-code {
          left: 79%;
        }      
        .item-price {
          left: 93%;
        }
        .side-menu {
          position: absolute;
          top: 15%;
        }

        .content-wrapper {
          display: flex;
          max-width: 1600px;
          margin: 0 auto;
          gap: 40px;
          
        }
          

        .cat-wrapper {
          display: flex;
          gap: 50px;
        }

        #categorymenu {
          font-size: 24px;
          font-weight: 900;
          color: white;
          text-align: center;
          color: red;
        }

        .menu-main-title {
          color: #80cf56;
          font-size: 50px;
          display: flex;
          justify-content: left;
          margin-top: 50px;
        }

        .menu-item {
          display: flex;
          margin-top: 3px;          
          justify-content: space-between;
          align-items: center;
          text-align: center;
          border-bottom: 1px solid grey;
        }
        .menu-volume,
        .menu-price,
        .menu-code {
          flex-basis: 40px;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 12px;
        }
        
        .menu-item .item-weight {
          width: 40px;
          outline: green 4px solid;

        }

        .menu-info {
          display: inline-block;
          vertical-align: top;
          margin-right: 30px;
        }

        .menu-title {
          display: flex;
          font-size: 13px;
          width: 400px;
          text-align: left;
        }
        .menu-description {
          display: none;
        }

        .save-button,
        .delete-btn {
          display: none;
        }

        .menu-code,
        .menu-category,
        .menu-price {
          display: block;
          margin-right: 25px;
        }

        .menu-weight {
          display: flex;
          margin-left: 10px;
        }

        .menu-price {
          margin-right: 0;
        }
        
        hr {
          width: 100%;
          display: block;
          border-top: 2px red solid;
          margin: auto;
          margin-bottom: 12px;
        }


        .header-date {
        display: flex;
        font-size: 14px;
        font-weight: 900;
        justify-content: center;
        align-items: center;
        margin-rop: 12px;
        
        }
      #categorymenu {
      font-size: 13px;
      margin-top: 0;
      }
      .subcategorymenu {
        display: none;
        }
      </style>`
  );

  // win.document.write(`
  //   <ul class="header-text">
  //     <li class="item-weight">▪ Weight</li>
  //     <li class="item-dish">▪ Dish</li>
  //     <li class="item-code">▪ ID</li>
  //     <li class="item-price">▪ Price</li>
  //   </ul>
  //   <hr>
  // `);
  win.document.write("</head><body>");

  win.document.write(tempDiv.innerHTML); 

  function createValuesTable() {
    const inputs = document.querySelectorAll(".signature-wrapper input");
    const container = document.createElement("div");

    container.className = "footer-centered-container";
    container.style.cssText =
      "font-size: 12px; text-align: center; width: 100%;";

    for (let i = 0; i < inputs.length; i += 2) {
      const pos = inputs[i]?.value || "";
      const name = inputs[i + 1]?.value || "[ who is responsible? ]";

      const line = document.createElement("div");
      line.className = "sign-line";
      line.style.cssText = "display: block; margin: 6px 0;";
      line.innerHTML = `<strong>${pos}: </strong><span>${name}</span>`;

      container.appendChild(line);
    }
    return container;
  }

  const injectBox = document.createElement("div");
  injectBox.id = "injectbox";
  injectBox.style.cssText = "color: blue; font-size: 12px; margin-top: 30px;";
  injectBox.appendChild(createValuesTable());

  win.document.body.appendChild(injectBox);

  win.document.write("</body></html>");

  win.document.close(); 

  win.onload = function () {
    win.print();
    win.close(); 
  };
}
