import { configureStore } from '@reduxjs/toolkit'
import historyReducer from './history/historySlice.ts'

export const store = configureStore({
    reducer: {
        history: historyReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch