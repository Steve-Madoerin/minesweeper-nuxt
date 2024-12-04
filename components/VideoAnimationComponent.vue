<template>
  <div class="background-container">
    <video v-if="!isOffline" class="video-background" autoplay muted loop playsinline>
      <source :src="videoSource" type="video/mp4" @error="handleVideoError" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import videoSrc from '/assets/video/minesweeper.mp4'

const videoSource = videoSrc
const isOffline = ref(false)

const handleVideoError = () => {
  isOffline.value = true
}
</script>

<style scoped>
.background-container {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/video/minesweeper.mp4');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -2; /* Make sure video is behind other content but above background */
}
</style>
