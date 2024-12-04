<template>
  <div class="btn-group">
    <GlossyButton @click="$emit('undo')">
      <i class="bi bi-arrow-counterclockwise" style="margin-right: 5px"></i>Undo
    </GlossyButton>
    <GlossyButton :class="{ 'flag-active': props.isFlagMode }" @click="$emit('flag')">
      &#128681;
    </GlossyButton>
    <GlossyButton @click="$emit('redo')">
      <i class="bi bi-arrow-clockwise" style="margin-right: 5px"></i>Redo
    </GlossyButton>
  </div>
</template>

<script setup lang="ts">
import GlossyButton from '@/components/buttonComponents/GlossyButton.vue'

const props = defineProps<{
  isFlagMode: boolean
}>()
</script>

<style scoped>
.btn-group {
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 10px;
}

.flag-active {
  background: #ff5151;
  color: white;
}
</style>
