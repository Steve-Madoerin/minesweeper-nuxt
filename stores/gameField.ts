import { defineStore } from 'pinia';

export const useGameFieldStore = defineStore('gameField', {
  state: () => ({
    gameField: '', // Standardwert, bis der Client den Zustand lädt
  }),
  actions: {
    loadGameField() {
      if (process.client) {
        this.gameField = localStorage.getItem('gameField') || '';
      }
    },
    setGameField(newField: string) {
      this.gameField = newField;
      if (process.client) {
        localStorage.setItem('gameField', newField);
      }
    },
  },
});





