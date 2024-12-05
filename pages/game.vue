<template>
    <div>
      <VideoAnimation />
      <div class="gameView">
        <SideBar @informServer="informServer" @cheat="cheat" />
        <div v-if="size === 'big'">
          <h1 style="font-size: 12px">Minesweeper</h1>
        </div>
        <div v-else>
          <h1>Minesweeper</h1>
        </div>
        <StatusBar :size="size" :status="status" :time="time" :flags="flags" @newGame="newGame" />
        <GameField :isFlagMode="isFlagMode" @click="informServer" @contextmenu="informServer" />
        <div v-if="status === 'Playing'" class="container">
          <ActionButtonGroup
            :isFlagMode="isFlagMode"
            @undo="undoField"
            @redo="redoField"
            @flag="toggleFlagMode"
          />
        </div>
        <div v-else-if="status === 'Lost'" class="container">
          <h1 style="font-size: 20px">You have lost the Game!</h1>
          <br />
          <div class="button-container">
            <button class="glossy-button" type="button" @click="newGame(size)">New Game</button>
          </div>
        </div>
        <div v-else-if="status === 'Won'" class="container">
          <h1 style="font-size: 20px">You have Won the Game!</h1>
          <h1 style="font-size: 13px">Your Score is {{ score }}</h1>
          <br />
          <div class="button-container">
            <button class="glossy-button" type="button" @click="newGame(size)">New Game</button>
          </div>
        </div>
        <ModalComponent
          :isVisible="isModalVisible"
          :field="cheatField"
          @close="isModalVisible = false"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import ActionButtonGroup from '~/components/buttonGroupComponents/ActionButtonGroup.vue'
  import GameField from '~/components/gameFieldComponent/GameFieldComponent.vue'
  import SideBar from '~/components/navBarComponents/SideBar.vue'
  import StatusBar from '~/components/statusBarComponents/StatusBar.vue'
  import VideoAnimation from '~/components/videoAnimationComponent/VideoAnimationComponent.vue'
  import ModalComponent from '~/components/modalComponent/ModalComponent.vue'
  import { useStore } from '@/stores/size'
  import { statusStore } from '@/stores/status'
  import { useGameFieldStore } from '@/stores/gameField'
  import { flagsStore } from '@/stores/flags'
  import { ref } from 'vue'
  
  const gameFieldStore = useGameFieldStore()
  const flagStore = flagsStore()
  const store = useStore()
  
  const cheatField = ref([])
  const flags = ref(flagStore.flags)
  const size = ref(store.size)
  const status = ref(statusStore().status)
  const score = ref(0)
  const isModalVisible = ref(false)
  const time = ref(0)
  const isSidebarVisible = ref(false)
  const isFlagMode = ref(false)
  
  let timerInterval: NodeJS.Timeout | null = null;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }
  
  const toggleFlagMode = () => {
    isFlagMode.value = !isFlagMode.value
  }
  
  async function undoField() {
    console.log('undoField')
    const response = await fetch('https://serene-peak-10116-79a087b3a95c.herokuapp.com/undo')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    gameFieldStore.setGameField(data.field)
    flags.value = data.flagAmount
    console.log(data)
  }
  
  async function redoField() {
    console.log('redoField')
    const response = await fetch('https://serene-peak-10116-79a087b3a95c.herokuapp.com/redo')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    gameFieldStore.setGameField(data.field)
    flags.value = data.flagAmount
    console.log(data)
  }
  
  async function cheat() {
    isModalVisible.value = true
    console.log('cheat')
    const response = await fetch('https://serene-peak-10116-79a087b3a95c.herokuapp.com/cheat')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    cheatField.value = data.field
    console.log(data)
  }
  
  async function informServer(command: string) {
    try {
      console.log('Received command:', command)
  
      if (typeof command === 'string') {
        if (command.startsWith('f') && flags.value === 0) {
          return
        }
        const response = await fetch(`https://serene-peak-10116-79a087b3a95c.herokuapp.com/infoJson/${command}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (checkTilde()) {
          startTimer()
        }
        gameFieldStore.setGameField(data.field)
        status.value = data.board
        flags.value = data.flagAmount
        if (data.board == 'Lost' || data.board == 'Won') {
          stopTimer()
          if (data.board == 'Won') {
            await calculateScore(time.value)
          }
        }
      } else {
        console.log('Command is not a string, ignoring.')
        return
      }
  
      console.log(flags.value + ' number falsd:')
      //console.log(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  
  async function newGame(gameSize: string) {
    try {
      if (timerInterval) {
        stopTimer()
      }
      const response = await fetch(`https://serene-peak-10116-79a087b3a95c.herokuapp.com/lgrid/${gameSize}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      console.log('new game gameview:')
      const data = await response.json()
      gameFieldStore.setGameField(data.field)
      status.value = data.board
      flags.value = data.flagAmount
      time.value = 0
      console.log(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  
  async function calculateScore(time: number) {
    try {
      const response = await fetch(`https://serene-peak-10116-79a087b3a95c.herokuapp.com/score/${time}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      score.value = data
      console.log(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  
  function checkTilde() {
    for (const [row] of gameFieldStore.gameField) {
      for (const [cellValue] of row) {
        if (cellValue == '~') {
          return true
        }
      }
    }
    return false
  }
  
  const startTimer = () => {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        time.value++
      }, 1000)
    }
  }
  
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }
  </script>
  
  <style scoped>
  @font-face {
    font-family: 'Minesweeper';
    src:
      url('../assets/fonts/mine-sweeper.woff2') format('woff2'),
      url('../assets/fonts/mine-sweeper.woff') format('woff'),
      url('../assets/fonts/mine-sweeper.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  H1 {
    text-align: center;
    font-size: 25px;
    font-weight: normal;
    color: #e7ebed;
    font-family: 'Minesweeper';
  }
  
  .glossy-button {
    padding: 0.3125rem 0.625rem; /* 5px 10px */
    background-color: linear-gradient(135deg, #c6d2e1 0%, #ffffff 50%, #b0c4de 100%);
    border: none;
    border-radius: 0.625rem; /* 10px */
    box-shadow:
      inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8),
      inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
      0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
    color: #383737;
    font-family: 'Avenir';
    font-size: 1rem; /* 16px */
    font-weight: lighter;
    text-align: center;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  
  .glossy-button:hover {
    background: #1f80ae;
    color: white;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .container {
    padding-top: 10px;
  }
  
  .gameView {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding-bottom: 15px;
  }
  </style>
  