<template>
  <header class="section-header">
    <div class="tbl">
      <div class="tbl-row">
        <div class="tbl-cell">
          <h3>{{ title }}</h3>
          <ol class="breadcrumb breadcrumb-simple">
            <li><router-link :to="{name: 'home'}">Início</router-link></li>
             <slot></slot>
          </ol>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    title : {
      type: String,
      required: true
    }
  }
}
</script>
