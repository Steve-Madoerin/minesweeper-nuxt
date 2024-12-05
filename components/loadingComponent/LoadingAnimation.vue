<template>
    <div class="minesweeper-loader">
      <div class="mine mine1"></div>
      <div class="mine mine2"></div>
      <div class="mine mine3"></div>
    </div>
</template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .minesweeper-loader {
    position: relative;
    width: 150px;
    height: 150px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .mine {
    width: 30px;
    height: 30px;
    background-size: contain;
    background-image: url('../assets/images/bomb.png');
    position: absolute;
    animation: circle 2s infinite linear;
  }
  
  .mine1 {
    animation-delay: 0s;
  }
  
  .mine2 {
    animation-delay: -0.66s;
  }
  
  .mine3 {
    animation-delay: -1.33s;
  }
  
  @keyframes circle {
    0% {
      transform: rotate(0deg) translateX(60px) rotate(0deg);
    }
    100% {
      transform: rotate(360deg) translateX(60px) rotate(-360deg);
    }
  }
  </style>
  