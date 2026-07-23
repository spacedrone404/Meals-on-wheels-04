function keyhelp() {
  const aboutChar = window.open("", "Decor", "width=1024,height=768");
  if (aboutChar) {
    aboutChar.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>LIST OF IMPORTANT HOTKEYS</title>
            <style>
              body {
                font-family: sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 99vh;
                margin: 0;
                background: #000000;
                color: #00ff37;
                font-weight: 900;
                text-align: center;
                border: 4px #00ff37 solid;
              }
              .about-close {
                outline: 2px #00ff37 solid;
                border-radius: 50%;
                width: 23px;
                height: 23px;
                position: absolute;
                top: 15px;
                left: 15px;
                cursor: pointer;
                transform: scale(1);
                transition: all 0.4s ease-in-out;
              }
              .about-close:hover {
                transform: scale(1.2);
                background:rgba(0, 255, 55, 0.56);
                color: white;
                transition: all 0.4s ease-in-out;
              } 
              .feat { list-style: none;  text-align: left; margin-bottom: 9px; text-shadow: 0 0 15px rgba(165, 214, 255, 0.7), 0 0 10px rgba(94, 101, 106, 0.5), 0 0 15px rgba(165, 214, 255, 0.3);}
              .help-button {color: white; background: red; padding: 2px; padding-left: 5px; padding-right: 5px; outline: 2px white solid; border-radius: 4px; box-shadow: inset -11px -3px 10px 2px rgba(230, 158, 195, 0.8);}
              .hotkey-cat {color: #00cfff;}
            </style>
          </head>
          <body>
            <div>         
              <div class="about-close" onclick="window.close();" title="Close the window">X</div>

          <li class="feat" style="color: red; font-size: 33px; text-transform: uppercase; text-align: center; margin-bottom: 40px;">Hotkeys</li>
          <li class="feat"> <span class="help-button">F1</span> &nbsp; ■■■ &nbsp; Menu editor / tempates <span class="hotkey-cat">[global]</span></li>
          <li class="feat"> <span class="help-button">F2</span> &nbsp; ■■■ &nbsp; Dish database / Add dish <span class="hotkey-cat">[global]</span></li>
          <li class="feat"> <span class="help-button">F3</span> &nbsp; ■■■ &nbsp; Settings <span class="hotkey-cat">[global]</span></li>
          <li class="feat"> <span class="help-button">F4</span> &nbsp; ■■■ &nbsp; Add dish to the database <span class="hotkey-cat">[Dish database]</span>  </li>
          <li class="feat"> <span class="help-button">F5</span> &nbsp; ■■■ &nbsp; Print main menu <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">F6</span> &nbsp; ■■■ &nbsp; Print bakery section  <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">F7</span> &nbsp; ■■■ &nbsp; Add dish from the database <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">F8</span> &nbsp; ■■■ &nbsp; Broadcast to customer screens <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">F9</span> &nbsp; ■■■ &nbsp; Save date into active template <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button" style="padding-left: 13px; padding-right: 13px;">,</span> &nbsp; ■■■ &nbsp; Customer screen #1 <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button" style="padding-left: 13px; padding-right: 13px;">.</span> &nbsp; ■■■ &nbsp; Customer screen #2 <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">CTRL</span> + <span class="help-button">Z</span> &nbsp; ■■■ &nbsp; Clear active template <span class="hotkey-cat"> [menu editor]</span> </li>
          <li class="feat"> <span class="help-button">1</span> / <span class="help-button">2</span> / <span class="help-button">3</span> ...  <span class="help-button">+</span> &nbsp; ■■■ &nbsp;  Active template selection <span class="hotkey-cat"> [menu editor]</span> </li>                    
          <li class="feat"> <span class="help-button">F11</span> &nbsp; ■■■ &nbsp;  About / manuals <span class="hotkey-cat">[global]</span></li>
          <li class="feat"> <span class="help-button">CTRL</span> + <span class="help-button">0</span> &nbsp; ■■■ &nbsp; System information <span class="hotkey-cat"> [About]</span> </li>          
          <li class="feat"> <span class="help-button">CTRL</span> + <span class="help-button">L</span> &nbsp; ■■■ &nbsp; Dark / light theme toggler <span class="hotkey-cat">[global]</span></li>          
          <li class="feat"> <span class="help-button">CTRL</span> + <span class="help-button">H</span> &nbsp; ■■■ &nbsp; List of hotkeys <span class="hotkey-cat">[global]</span></li>


          </div>
          </body>
          </html>
        `);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "h") {
    e.preventDefault();
    keyhelp();
  }
});
