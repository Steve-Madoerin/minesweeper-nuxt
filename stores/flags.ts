import { defineStore } from 'pinia'

export const flagsStore = defineStore('flags', {
  state: () => ({
    flags: 0,
  }),
  actions: {
    setFlags(flags: number) {
      this.flags = flags
    },
  },
})

