import { defineStore } from 'pinia';

export const timeStore = defineStore('time', {
  state: () => ({
    time: 0,
  }),
  actions: {
    setTime(time: number) {
      this.time = time;
    },
  },
});
