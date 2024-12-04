<template>
  <div>
    <VideoAnimation />

    <div class="index">
      <h1>Minesweeper</h1>
      <StartButtonGroup />

      <div style="margin-top: 25px">
        <img class="image" src="@/assets/images/bomb.png" @click="navigateToMinesweeper()"  />
      </div>
    </div>

    <div class="infoicon-container">
      <img class="image-info" src="../assets/images/rules.png" @click="navigateToRules()" />
    </div>

    <div
      style="
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        margin-bottom: 10px;
      "
    >
      <p>&copy; 2024 by Steve Madoerin &amp; Dennis Hoang</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/stylesheets/start-minesweeper.css';

.image-info {
  width: 50px; /* Adjust the size as needed */
  height: 50px;
}

.infoicon-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000; /* Ensure the infoicon is on top */
}
</style>

<script setup lang="ts">
import VideoAnimation from '@/components/VideoAnimationComponent.vue'
import StartButtonGroup from '@/components/buttonGroupComponents/StartButtonGroup.vue'
import { navigateTo } from '#app'
import { useStore } from '@/stores/size'
import { statusStore } from '@/stores/status'
import { useGameFieldStore } from '@/stores/gameField'
import { flagsStore } from '@/stores/flags'
import { useRouter } from 'vue-router'

function navigateToRules() {
  navigateTo('/rules')
}



const flagStore = flagsStore()
const storeSize = useStore()
const gameFieldStore = useGameFieldStore()
const storeStatus = statusStore()
const router = useRouter()
//const isOffline = ref(!navigator.onLine)





onMounted(() => {
  localStorage.setItem('seconds', '0')
  localStorage.setItem('isPaused', JSON.stringify(true))

  //window.addEventListener('online', updateOnlineStatus)
  //window.addEventListener('offline', updateOfflineStatus)
})





//const updateOnlineStatus = () => (isOffline.value = false)
//const updateOfflineStatus = () => (isOffline.value = true)



async function newGame() {
  try {
    /*
    if (isOffline.value) {
      throw new Error('You are offline')
    }
    */
    console.log('new game start minesweeper: ' + storeSize.size)
    const response = await fetch(`http://serene-peak-10116-79a087b3a95c.herokuapp.com/lgrid/${storeSize.size}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    flagStore.setFlags(data.flagAmount)
    console.log('data repsonse:' + data.value)
    gameFieldStore.setGameField(data.field)
    storeStatus.setStatus(data.board)
    console.log(data)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    throw error
  }
}

 async function navigateToMinesweeper() {
  try {
    const game = await newGame()
    //console.log('game: ' + game)
    //navigateTo('/game')
  } catch (Error) {
    //TODO: navigate to offline page
    //navigateTo('/offline')
    console.error(Error)
  }
}



</script>
