class DocumentFactory {

  static createTitle(title) {
    document.addEventListener("DOMContentLoaded", () => {
      document.title = title;
    });
  }

  static removeClassBody() {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.remove("with-side-menu");
      document.body.classList.remove("control-panel");
      document.body.classList.remove("control-panel-compact");
      document.body.classList.add("auth");
    });
  }

}

export default DocumentFactory;
