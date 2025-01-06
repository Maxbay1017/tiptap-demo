<script setup lang="ts">
const content = ref('<p>这是一段熟悉的小情歌!</p>')
</script>

<template>
  <div>
    <Editors v-model="content" />
  </div>
</template>

<style lang="scss"></style>