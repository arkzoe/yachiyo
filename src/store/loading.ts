import { defineStore } from 'pinia'

interface LoadingState {
  isLoading: boolean
}

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => ({
    isLoading: false
  }),
  actions: {
    startLoading() {
      this.isLoading = true
    },
    stopLoading() {
      this.isLoading = false
    }
  }
})