<template>
  <div class="layout">
    <div class="page-container">
      <div class="page flex flex-center">
        <VideoAnimationComponent></VideoAnimationComponent>
        <!-- <video class="video-background" autoplay loop muted>
          <source src="@/assets/video/minesweeper.mp4" type="video/mp4" />
        </video> -->
        <div class="centered-container">
          <h1 class="header">Minesweeper</h1>
          <div class="container">
            <div class="column">
              <p class="section-title">About Minesweeper:</p>
              <p class="section-content">
                Minesweeper is a calculable logic and thinking game. It has been a popular computer
                game since the 1960s. The number fields indicate how many bombs are located within a
                radius of eight fields around the number field. If you suspect a bomb field, place a
                red flag as a marker. Uncover all the squares without activating a bomb to win the
                game.
              </p>
            </div>
            <div class="column">
              <p class="section-title">How to run it locally:</p>
              <p class="section-content">
                This Minesweeper version is a Scala Play project for the Web-Application lecture at
                HTWG.
              </p>
              <ul class="section-list">
                <li>Compile the code with 'sbt compile'</li>
                <li>Run the game using 'sbt run'</li>
                <li>
                  Access the Scala 3 REPL with 'sbt console' to experiment and extend the project
                </li>
              </ul>
            </div>
          </div>
          <div class="container-button">
             <button class="return-button" @click="goBack">Continue</button>
          </div>
          <div class="container">
            <div class="column">
              <p class="section-title">How to Play:</p>
              <div class="section-content">
                <dl>
                  <dt><strong>WUI:</strong></dt>
                  <dd>
                    <li class="section-list"><strong>Left-click</strong> to open a field</li>
                    <li class="section-list">
                      <strong>Right-click</strong> to flag or unflag a field
                    </li>
                  </dd>
                  <dt><strong>TUI:</strong></dt>
                  <dd>
                    <li class="section-list"><strong>&lt;command&gt;&lt;xy&gt;</strong></li>
                    <li class="section-list">
                      <strong>o0101</strong> opens the field at location x: 01, y: 01
                    </li>
                    <li class="section-list">
                      <strong>o0108</strong> opens the field at location x: 01, y: 08
                    </li>
                    <li class="section-list">
                      <strong>f0201</strong> puts a flag on the field at x: 02, y: 01
                    </li>
                    <li class="section-list">
                      <strong>u0201</strong> unflags the field at x: 02, y: 01
                    </li>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="column">
              <p class="section-title">Game Rules:</p>
              <ul class="section-list">
                <li>The game board contains hidden mines randomly placed across the grid.</li>
                <li>Numbers indicate how many mines are adjacent to that cell.</li>
                <li>If you uncover a mine, the game ends.</li>
                <li>Win the game by uncovering all non-mine cells.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoAnimationComponent from '@/components/VideoAnimationComponent.vue'


import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
// const goBack = () => {
//   history.back()
// }
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

@font-face {
  font-family: 'Minesweeper';
  src:
    url('../assets/fonts/mine-sweeper.woff2') format('woff2'),
    url('../assets/fonts/mine-sweeper.woff') format('woff'),
    url('../assets/fonts/mine-sweeper.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.header {
  font-family: 'Minesweeper';
  font-size: 5vw; /* 50px */
  color: white;
  margin-top: 0.625rem; /* 10px */
  padding-bottom: 0;
  text-align: center;
  width: 100%;
  z-index: 100;
}

.centered-container {
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (max-width: 576px) {
  .centered-container {
    flex-direction: column;
  }
}

.content-wrapper h1 {
  font-family: 'Minesweeper';
  font-size: 3.125rem; /* 50px */
  color: white;
  margin-top: 0.625rem; /* 10px */
  padding-bottom: 0;
  text-align: center;
  width: 100%;
}

.container li {
  font-size: 1rem; /* 16px */
  margin-bottom: 0;
  padding-bottom: 0;
}

.column {
  border-radius: 0.4375rem; /* 7px */
  background-color: #d0d5d9;
  opacity: 0.8;
}

.section-title {
  font-weight: bold;
  font-family: 'Minesweeper';
  font-size: 1.3rem; /* 22px */
  text-align: left;
  margin-top: 0;
  margin-bottom: 0;
}

.section-content {
  font-family: 'Andale Mono';
  text-align: left;
  font-size: 1rem; /* 16px */
}

.section-list {
  font-family: 'Andale Mono';
  list-style-type: disc;
  text-align: left;
}

.return-button {
  font-family: 'Andale Mono';
  color: white;
  font-size: 2em;
  padding: 0.3125rem 1.5rem; /* 5px 24px */
  border: black;
  background-color: lightsteelblue;
  border-radius: 0.4375rem; /* 7px */
  z-index: 100;
}

.return-button:hover {
  background-color: lightsalmon;
}

.container-button {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  width: 100%;
  flex-wrap: wrap; /* Allows columns to wrap on smaller screens */
  gap: 16px; /* Optional: adds spacing between columns */
}

.column {
  flex: 1; /* Columns take equal space */
  min-width: 200px; /* Ensures columns don't shrink too much */
  padding: 16px; /* Optional: adds padding inside columns */
  background-color: #f0f0f0; /* Optional: styles for visibility */
  text-align: center;
  z-index: 100;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stacks the columns vertically */
  }
}
</style>
