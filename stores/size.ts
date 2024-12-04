import { defineStore } from 'pinia';

export const useStore = defineStore('size', {
  state: () => ({
    size: 'extraSmall',
  }),
  actions: {
    setSize(size: string) {
      this.size = size;
    },
  },
});
