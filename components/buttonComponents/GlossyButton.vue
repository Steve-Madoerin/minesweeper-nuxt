<template>
  <button class="glossy-button" type="button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  onClick: () => void
}>()
</script>

<style scoped>
.glossy-button {
  padding: 0.3125rem 0.625rem; /* 5px 10px */
  background-color: linear-gradient(135deg, #c6d2e1 0%, #ffffff 50%, #b0c4de 100%);
  border: none;
  border-radius: 0.625rem; /* 10px */
  box-shadow:
      inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8),
      inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
      0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
  color: #383737;
  font-family: 'Avenir';
  font-size: 1rem; /* 16px */
  font-weight: lighter;
  text-align: center;
  cursor: pointer;
  transition:
      background-color 0.3s,
      color 0.3s;
  position: relative;
}

.glossy-button:hover {
  background: #1f80ae;
  color: white;
}
</style>
