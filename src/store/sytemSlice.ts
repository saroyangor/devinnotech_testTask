import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SystemState = {
  celsius: boolean
}

const initialState: SystemState = {
  celsius: true
}

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleSystem(state, action: PayloadAction<boolean>) {
      state.celsius = action.payload
    }
  }
})

export const {toggleSystem} = systemSlice.actions

export default systemSlice.reducer