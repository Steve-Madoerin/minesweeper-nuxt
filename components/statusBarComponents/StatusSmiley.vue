<template>
  <template v-if="size === 'extraSmall'">
    <td id="state" class="statusbar-cell-smiley" @click="$emit('newGame', 'extraSmall')">
      {{ getSmileyType(status) }}
    </td>
  </template>
  <template v-else-if="size === 'small'">
    <td id="space" class="statusbar-cell-space-small"></td>
    <td id="state" class="statusbar-cell-smiley" @click="$emit('newGame', 'small')">
      {{ getSmileyType(status) }}
    </td>
    <td id="space" class="statusbar-cell-space-small"></td>
  </template>
  <template v-else-if="size === 'medium'">
    <td id="space" class="statusbar-cell-space-medium"></td>
    <td id="state" class="statusbar-cell-smiley" @click="$emit('newGame', 'medium')">
      {{ getSmileyType(status) }}
    </td>
    <td id="space" class="statusbar-cell-space-medium"></td>
  </template>
  <template v-else-if="size === 'big'">
    <td id="space" class="statusbar-cell-space-big"></td>
    <td id="state" class="statusbar-cell-smiley" @click="$emit('newGame', 'big')">
      {{ getSmileyType(status) }}
    </td>
    <td id="space" class="statusbar-cell-space-big"></td>
  </template>
</template>

<script setup lang="ts">
const { size, status } = defineProps({
  size: String,
  status: {
    type: String,
    default: 'Playing',
  },
})

const getSmileyType = (status: string) => {
  switch (status) {
    case 'Playing':
      return '😊'
    case 'Won':
      return '😎'
    case 'Lost':
      return '😢'
    default:
      return 'Playing'
  }
}
</script>

<style scoped>
.statusbar-cell-smiley {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #e0e0e0 100%, #ffffff 100%, #dfe1e3 100%);
  border: none;
  border-radius: 0.625rem;
  box-shadow:
    inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.414),
    inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
    0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
  color: #575757;
  font-family: 'Minesweeper', 'fantasy';
  font-size: 1.5625rem;
  font-weight: 100;
  text-align: center;
  padding-bottom: 0.3125rem;
}

.statusbar-cell-space-small {
  width: 5rem;
  height: 2.5rem;
  overflow: hidden;
}

.statusbar-cell-space-medium {
  width: 6.375rem;
  height: 2.5rem;
  overflow: hidden;
}

.statusbar-cell-space-big {
  width: 7.75rem;
  height: 2.5rem;
  overflow: hidden;
}

#state {
  width: 2.625rem;
  height: 2.5rem;
  text-align: center;
  vertical-align: middle;
}
</style>
