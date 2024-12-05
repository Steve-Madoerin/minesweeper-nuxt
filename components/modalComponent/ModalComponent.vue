<template>
  <div class="modal-bg" v-if="isVisible">
    <div class="modal">
      <header class="modal-header">
        <h2>Cheat</h2>
        <button class="close-btn" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>
        <CheatField :field="field" />
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheatField from '~/components/cheatFieldComponent/CheatFieldComponent.vue'

defineProps<{
  isVisible: boolean
  field: string[]
}>()

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  padding: 50px 50px;
  border-radius: 10px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal .close-btn {
  position: absolute;
  justify-content: center;
  border: none;
  top: 20px;
  right: 50px;
  background: none;;
  font-size: 30px;
  cursor: pointer;
}

.modal-header {
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-header h2 {
  justify-content: center;
  align-content: center;
  margin: 0;
  font-size: 2.5rem;
  color: darkslategrey;
  font-family: Minesweeper;
  padding-bottom: 20px;
}
</style>
