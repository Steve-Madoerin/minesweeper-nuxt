<template>
  <table id="statusbar-table">
    <tbody>
      <tr>
        <StatusBoms :flags="flags" />
        <StatusSmiley :size="size" :status="status" @newGame="$emit('newGame', $event)" />
        <StatusTime :time="time" />
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import StatusBoms from './StatusBombs.vue'
import StatusSmiley from './StatusSmiley.vue'
import StatusTime from './StatusTime.vue'

const { size, flags, status, time } = defineProps({
  size: String,
  flags: {
    type: Number,
    default: 3,
  },
  status: {
    type: String,
    default: 'Playing',
  },
  time: {
    type: Number,
    default: 0,
  },
})
</script>

<style scoped>
#statusbar-table {
  position: relative;
  border-collapse: separate;
  border-spacing: 0.3125rem;
  padding: 0.625rem;
  background-color: #d0d5d9;
  border-radius: 0.625rem;
  margin: 0.625rem auto;
}
</style>
