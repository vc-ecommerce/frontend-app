export const transformImageToBase64 = (e) => {

  return new Promise((resolve, reject) => {

    const file = e.target.files || e.dataTransfer.files;

    if (!file.length) {
      reject(false);
    }

    const reader = new FileReader();
    reader.onloadend = e => resolve(e.target.result);

    if (file) {
      reader.readAsDataURL(file[0]);
    } else {
      reject(false);
    }

  });

}
