export function notifySuccess(title, message) {

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

export function notifyDanger(title, message) {

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

export function notifyWarning(title, message) {

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

export function notifyInfo(title, message) {

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
