import { defineStore } from 'pinia'
import type { Category } from '~/types/category.model'

export const useMyCategoryStore = defineStore({
  id: 'myCategoryStore',
  state: () => ({ 
    categoryList : [] as Category[]
  }),
  actions: {}
})
