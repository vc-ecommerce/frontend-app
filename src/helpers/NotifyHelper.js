class NotifyHelper {

  static success(title, message) {

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
  }

  static danger(title, message) {

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
  }

  static warning(title, message) {

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

  }

  static info(title, message) {

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

export default NotifyHelper;
