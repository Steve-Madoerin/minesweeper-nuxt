<template>
  <table id="field-table">
    <tbody>
      <tr v-for="(row, rowIndex) in gameFieldStore.gameField" :key="rowIndex">
        <td
          v-for="(cellValue, colIndex) in row"
          :key="colIndex"
          :id="`cell-${rowIndex}-${colIndex}`"
          :class="`field-cell-${getCellClass(cellValue)}`"
          @click="$emit('click', handleCellClick(cellValue, rowIndex, colIndex))"
          @contextmenu.prevent="
            $emit('contextmenu', handleContextMenu(cellValue, rowIndex, colIndex))
          "
        >
          <span v-if="cellValue !== '0' && cellValue !== 'F'">{{ cellValue }}</span>
          <span v-if="cellValue === 'F'" style="pointer-events: none">&#128681;</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useGameFieldStore } from '@/stores/gameField'

const gameFieldStore = useGameFieldStore()
const emit = defineEmits(['click', 'contextmenu'])

const props = defineProps<{
  isFlagMode: boolean
}>()

function getCellClass(cellValue: string) {
  switch (cellValue) {
    case '~':
      return 'covered'
    case 'F':
      return 'covered-flag'
    case '1':
      return 'open-one'
    case '2':
      return 'open-two'
    case '3':
      return 'open-three'
    case '4':
      return 'open-four'
    case '5':
      return 'open-five'
    case '6':
      return 'open-six'
    case '7':
      return 'open-seven'
    case '8':
      return 'open-eight'
    default:
      return 'open'
  }
}

function handleCellClick(cellValue: string, rowIndex: number, colIndex: number) {
  let move
  if (props.isFlagMode) {
    if (cellValue === 'F') {
      move = `u${colIndex <= 9 ? `0${colIndex}` : colIndex}${rowIndex <= 9 ? `0${rowIndex}` : rowIndex}`
    } else {
      move = `f${colIndex <= 9 ? `0${colIndex}` : colIndex}${rowIndex <= 9 ? `0${rowIndex}` : rowIndex}`
    }
  } else {
    if (cellValue === 'F') {
      return
    }
    move = `o${colIndex <= 9 ? `0${colIndex}` : colIndex}${rowIndex <= 9 ? `0${rowIndex}` : rowIndex}`
  }
  emit('click', move)
  // return move
}

function handleContextMenu(cellValue: string, rowIndex: number, colIndex: number) {
  const prefix = cellValue === 'F' ? 'u' : 'f'
  const move = `${prefix}${colIndex <= 9 ? `0${colIndex}` : colIndex}${rowIndex <= 9 ? `0${rowIndex}` : rowIndex}`
  return move
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

#field-table {
  margin-left: auto;
  margin-right: auto;
}

#field-table {
  border-collapse: separate;
  border-spacing: 0.3125rem; /* 5px */
  padding: 0.625rem; /* 10px */
  background-color: #d0d5d9;
  border-radius: 0.625rem; /* 10px */
}

.field-cell-covered {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  border-radius: 0.625rem; /* 10px */
  box-shadow:
    inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8),
    inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
    0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
  font-size: 0;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-covered-flag {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  border-radius: 0.625rem; /* 10px */
  box-shadow:
    inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8),
    inset 0 -0.3125rem 0.625rem rgba(0, 0, 0, 0.2),
    0 0.5rem 0.9375rem rgba(0, 0, 0, 0.3);
  color: #383737; /* Changed to black for better contrast */

  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: 100;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-covered:hover {
  background-color: #1f80ae;
  color: white;
}

.field-cell-covered-flag:hover {
  background-color: #1f80ae;
  color: white;
}

.field-cell-open {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #444444; /* Changed to black for better contrast */
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-one {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #0400e2;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-two {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #59e493;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-three {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #ff4343;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-four {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #922bff;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-five {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #ff5bb8;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-six {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #0cf1f9;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-seven {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #faff5d;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
}

.field-cell-open-eight {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  background-color: linear-gradient(135deg, #c6d2e1 100%, #ffffff 100%, #b0c4de 100%);
  box-shadow: inset 0 0.3125rem 0.625rem rgba(255, 255, 255, 0.8);
  border-radius: 0.625rem; /* 10px */
  color: #7f7f7f;
  font-family: Minesweeper; /*fantasy; Provisorisch geändert -Dennis*/
  font-size: 1.25rem; /* 20px */
  font-weight: lighter;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: background-color 0.3s;
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
</style>
