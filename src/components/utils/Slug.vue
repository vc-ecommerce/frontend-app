<template>
  <span v-if="slug" class="control">{{ `${$urlSite}/${directory}/${slug}` }}</span>
</template>

<script>
  export default {
    name: 'Slug',
    props: {
      slug: {
        type: String,
        required: true
      },
      directory: {
        type: String,
        required: true
      }
    }
  }
</script>
