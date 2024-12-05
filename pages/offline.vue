<template>
    <div v-if="isOffline" class="dialog-overlay">
      <div class="dialog">
        <div class="dialog-body">
          <LoadingAnimation/>
          <div class="dialog-body-text">
            <p>You are currently offline.</p>
            <p>Please check your internet connection.</p>
          </div>
          <div class="dialog-actions">
            <button class="retry-btn" @click="refreshPage">Retry</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import LoadingAnimation from '~/components/loadingComponent/LoadingAnimation.vue';
  
  //import { useRouter } from 'vue-router'
  
  //const router = useRouter()
  
  defineProps({
    isOffline: {
      type: Boolean,
      default: true,
    },
  })
  
  const refreshPage = () => {
    navigateTo('/')
  }
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dialog {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .dialog-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .dialog-body-text {
    text-align: center;
    color: rgb(55, 55, 55);
    margin-top: 10px;
  }
  
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .retry-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .retry-btn:hover {
    background-color: #0056b3;
  }
  </style>
  