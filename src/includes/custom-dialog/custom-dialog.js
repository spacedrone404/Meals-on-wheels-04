export const ConfirmDialog = {
  show: (userOptions) => {
    const options = {
      text: "Confirmation",
      textClass: "",
      okText: "Accept",
      okClass: "",
      useCancel: true,
      cancelText: "Cancel",
      cancelClass: "",
      modalClass: "",
      boxClass: "",
      success: false,
      warning: false,
      error: false,
      ...userOptions,
    };

    const originalBodyStyles = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      width: document.body.style.width,
    };

    //OK icon template
    const success = `
            <div class="icon-wrap">
                <div class="icon-wrap-success">
                    <div class="icon-wrap-success-tip"></div>
                    <div class="icon-wrap-success-long"></div>
                    <div class="icon-wrap-success-placeholder"></div>
                    <div class="icon-wrap-success-fix"></div>
                </div>
            </div>
        `;

    //Warning icon template
    const warning = `
            <div class="icon-wrap">
                <div class="icon-wrap-warning">
                    <div class="icon-wrap-warning-body"></div>
                    <div class="icon-wrap-warning-dot"></div>
                </div>
            </div>
        `;

    //Error icon template
    const error = `
            <div class="icon-wrap">
                <div class="icon-wrap-error">
                    <div class="icon-wrap-error-x">
                        <div class="icon-wrap-error-left"></div>
                        <div class="icon-wrap-error-right"></div>
                    </div>
                    <div class="icon-wrap-error-placeholder"></div>
                    <div class="icon-wrap-error-fix"></div>
                </div>
            </div>
        `;

    //Ok button template
    const ok = `
            <button id="ok" class="button ${options.okClass}">${options.okText}</button>
        `;

    //Cancel button template
    const cancel = `
            <button id="cancel" class="button ${options.cancelClass}">${options.cancelText}</button>
        `;

    //Icon inject
    let icons = "";
    icons += options.success ? success : "";
    icons += options.warning ? warning : "";
    icons += options.error ? error : "";

    //Cancel button inject
    let useCancel = options.useCancel ? cancel : "";

    //Html dummy
    const template = `
            <div id="modal" class="modal ${options.modalClass}">
                <div class="box ${options.boxClass}">
                    <div class="content">
                        ${icons}
                        <div class="text ${options.textClass}">${options.text}</div>
                    </div>
                    <div class="buttons">
                        ${ok}${useCancel}
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", template);
    const dialog = document.getElementById("modal");

    // Prevents scrolling and scrollbar
    document.body.style.cssText = ` overflow: hidden !important; height: 100%; width: 100%; `;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    //Outside box
    const handleClickOutside = (event) => {
      if (event.target === dialog) {
        closeModal();
      }
    };

    //Remove modal
    const remove = () => {
      dialog.classList.add("cd-out");
      setTimeout(() => {
        dialog.remove();
        // Restore original styles
        Object.assign(document.body.style, originalBodyStyles);
      }, 300);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    const closeModal = () => {
      remove();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };

    return new Promise((resolve, _) => {
      document.getElementById("ok").addEventListener("click", () => {
        remove();
        resolve(true);
      });
      if (options.useCancel) {
        document.getElementById("cancel").addEventListener("click", () => {
          remove();
          resolve(false);
        });
      }
    });
  },
};
