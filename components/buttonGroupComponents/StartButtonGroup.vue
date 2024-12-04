<template>
  <div class="btn-group">
    <StartButton
        :isActive="selectedSize === 'extraSmall'"
        borderRadius="7px 0 0 7px"
        @click="updateLink('extraSmall')"
    >XSMALL
    </StartButton>
    <StartButton
        :isActive="selectedSize === 'small'"
        borderRadius="0"
        @click="updateLink('small')"
    >SMALL
    </StartButton>
    <StartButton
        :isActive="selectedSize === 'medium'"
        borderRadius="0"
        @click="updateLink('medium')"
    >MEDIUM
    </StartButton>
    <StartButton
        :isActive="selectedSize === 'big'"
        borderRadius="0 7px 7px 0"
        @click="updateLink('big')"
    >
      LARGE
    </StartButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StartButton from '@/components/buttonComponents/StartButton.vue'
import { useStore } from '@/stores/size'

const selectedSize = ref('extraSmall')
const store = useStore()

function updateLink(option: string) {
  store.setSize(option)
  selectedSize.value = option
  // Emit the event to the parent component if needed
}
</script>

<style scoped>
.btn-group button {
  background-color: lightsteelblue;
  border: black;
  color: #e7ebed;
  padding: 5px 24px;
  margin-top: 25px;
  cursor: pointer;
  float: left;
}

.btn-group:after {
  content: '';
  clear: both;
  display: table;
}

.btn-group button:not(:last-child) {
  border-right: none;
}

.btn-group button:hover {
  background-color: lightsalmon;
}
</style>