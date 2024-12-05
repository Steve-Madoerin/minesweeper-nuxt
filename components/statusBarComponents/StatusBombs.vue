<template>
  <td id="flag-count" class="statusbar-cell">{{ displayFlag(flags) }}</td>
</template>

<script setup lang="ts">
const { flags } = defineProps({
  flags: {
    type: Number,
    default: 3,
  },
})

const displayFlag = (amount: number) => {
  return amount.toString().padStart(3, '0')
}
</script>

<style scoped>
.statusbar-cell {
  width: 5.25rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #e0e0e0 100%, #ffffff 100%, #dfe1e3 100%);
  border-radius: 0.625rem;
  box-shadow:
    inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.414),
    inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
    0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
  color: #575757;
  font-family: 'Minesweeper', 'fantasy';
  font-size: 1.25rem;
  font-weight: 100;
  text-align: center;
  vertical-align: middle;
}
</style>
