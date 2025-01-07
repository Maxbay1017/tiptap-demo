<script setup lang="ts">
const content = ref('<p>This is a <span class="clickable-span">clickable span</span> example.</p>');
</script>

<template>
  <div>
    <Editors v-model="content" />
  </div>
</template>

<style lang="scss"></style>