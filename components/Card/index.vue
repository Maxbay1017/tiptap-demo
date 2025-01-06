<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm">
      <slot />
      <button @click="visible = false" class="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
        关闭
      </button>
    </div>
  </div>
</template>

<script setup>
const visible = ref(false)
defineExpose({
  show: () => visible.value = true
})
</script>