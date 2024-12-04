import { defineStore } from 'pinia'

export const statusStore = defineStore('status', {
  state: () => ({
    status: 'Playing',
  }),
  actions: {
    setStatus(status: string) {
      this.status = status
    },
  },
})
