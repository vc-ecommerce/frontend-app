<template>
  <div
    class="alert alert-info alert-border-left alert-close alert-dismissible fade show"
    role="alert"
  >
    <button style="margin-top:2px" type="button" class="btn btn-info pull-right">Visualizar</button>
    <h4>Aniversariantes do mês
      <span class="glyphicon glyphicon-gift"></span>
    </h4>
    <small>
      <strong>1 cliente</strong>
      está fazendo aniversário em
      <strong>Dezembro</strong>

      .
      Envie os parabéns e aproveite para conceder um cupom de desconto!
    </small>
  </div>
</template>

<script>
export default {
  name: 'Birthdays'
}
</script>
