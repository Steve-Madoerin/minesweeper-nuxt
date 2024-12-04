<template>
  <button
      type="button"
      class="single-button"
      :class="{ actives: isActive }"
      @click="handleClick"
      :style="buttonStyle"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isActive: boolean
  borderRadius: string
}>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

const buttonStyle = computed(() => ({
  borderRadius: props.borderRadius,
}))
</script>
<style scoped>
.single-button {
  width: 14vw;
  height: 6vw;
  font-family: 'Andale Mono';
  background-color: lightsteelblue;
  font-size: 2.5vw;
}

@media (max-width: 576px) {
  .single-button {
    width: 25%;
    height: 35px;
    font-size: 1em;
    font-family: 'Andale Mono';
    background-color: lightsteelblue;
  }
}



.single-button:hover {
  background-color: lightsalmon;
}

.single-button.actives {
  background-color: salmon !important;
}
</style>
