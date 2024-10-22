import { configureStore } from '@reduxjs/toolkit'
import weatherSlice from './weatherSlice.ts'
import systemSlice from './sytemSlice.ts'


const store = configureStore({
  reducer: {
    weather: weatherSlice,
    system: systemSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch