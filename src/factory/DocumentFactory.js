class DocumentFactory {

  static createTitle(title) {
    document.addEventListener("DOMContentLoaded", () => {
      document.title = title;
    });
  }

}

export default DocumentFactory;
