const infoTitle = 'Informe o parâmetro "title" em notifyHelpers';
const infoMessage = 'Informe o parâmetro "message" em notifyHelpers';

const showError = (title, message) => {
  if (!title)
    alert(infoTitle)

  if (!message)
    alert(infoMessage)
}

export const notifyHelpers = {

  success(title, message) {

    showError(title, message);

    $.notify({
      icon: 'font-icon font-icon-check-circle',
      title: `<strong>${title}</strong>`,
      message
    }, {
      type: 'success'
    });
  },

  danger(title, message) {

    showError(title, message);

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
      type: 'danger'
    });
  },

  warning(title, message) {

    showError(title, message);

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
      type: 'warning'
    });

  },

  info(title, message) {

    showError(title, message);

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
      type: 'purple'
    });

  }

}
