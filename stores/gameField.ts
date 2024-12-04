import { defineStore } from 'pinia';

export const useGameFieldStore = defineStore('gameField', {
    state: () => ({
        gameField: '', // Standardwert, bis der Client den Zustand lädt
    }),
    actions: {
        loadGameField() {
            if (process) {
                console.log('Loading game field from local storage');
                this.gameField = localStorage.getItem('gameField') || '';
                return this.gameField;
            }
        },
        setGameField(newField: string) {
            this.gameField = newField;
            if (process) {
                console.log('Saving game field to local storage');
                localStorage.setItem('gameField', newField);
            }
        },
    },
});





