<template>
  <div
    class="alert alert-info alert-border-left alert-close alert-dismissible fade show"
    role="alert"
  >
    <button
      style="margin-top:2px"
      data-id="00001"
      data-user-name="William Duarte"
      @click.prevent="someMethod"
      type="button"
      class="btn btn-info pull-right"
    >Visualizar</button>
    <h4>
      Aniversariantes do mês
      <span class="glyphicon glyphicon-gift"></span>
    </h4>
    <small>
      <strong>1 cliente</strong>
      está fazendo aniversário em
      <strong>Dezembro</strong>
      .
      Envie os parabéns id aproveite para conceder um cupom de desconto!
    </small>
  </div>
</template>

<script>
export default {
  name: "Birthdays",
  methods: {
    someMethod: () => {
      console.log(event);
      console.log(event.target);
      console.log(event.target.dataset);
      console.log("ID:", event.target.dataset.id);
      console.log("Name:", event.target.dataset.userName);
    }
  },
  mounted() {}
};
</script>
