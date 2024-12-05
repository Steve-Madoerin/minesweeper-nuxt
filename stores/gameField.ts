import { defineStore } from 'pinia';

export const useGameFieldStore = defineStore('gameField', {
    state: () => ({
        gameField: '',
    }),
    actions: {
        setGameField(newField: string) {
            this.gameField = newField;
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});





