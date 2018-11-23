export const notifyHelpers = {

  success(title, message) {

    if (!title)
      throw new Error('Informe o título notify');

    if (!message)
      throw new Error('Informe o mensagem notify');

    $.notify({
      icon: 'font-icon font-icon-check-circle',
      title: `<strong>${title}</strong>`,
      message
    }, {
        type: 'success'
      });
  },

  danger(title, message) {

    if (!title)
      throw new Error('Informe o título notify');

    if (!message)
      throw new Error('Informe o mensagem notify');

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
        type: 'danger'
      });
  },

  warning(title, message) {

    if (!title)
      throw new Error('Informe o título notify');

    if (!message)
      throw new Error('Informe o mensagem notify');

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
        type: 'warning'
      });

  },

  info(title, message) {

    if (!title)
      throw new Error('Informe o título notify');

    if (!message)
      throw new Error('Informe o mensagem notify');

    $.notify({
      icon: 'font-icon font-icon-warning',
      title: `<strong>${title}</strong>`,
      message
    }, {
        type: 'purple'
      });

  }

}
