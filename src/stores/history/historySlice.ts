import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isEqual} from "lodash";

export type HistoryElement = {
    text: string;
    bold: boolean;
    italic: boolean;
}

export type History = Array<HistoryElement>

// Стандартный History API
export interface HistoryState {
    past: History
    future: History
    present: HistoryElement
}

const initialState: HistoryState = {
    present: { bold: false, text: 'Change me!', italic: false },
    past: [],
    future: [],
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        push: (state, action: PayloadAction<HistoryElement>) => {
            if (isEqual(state.present, action.payload)) return;
            state.past = [...state.past, state.present];
            state.present = action.payload;
            state.future = [];
        },
        undo: (state) => {
            if (!state.past.length) return;
            state.future = [...state.future, state.present]
            state.present = state.past[state.past.length - 1];
            state.past = state.past.slice(0, state.past.length - 1);
        },
        redo: (state) => {
            if (!state.future.length) return;
            state.past = [...state.past, state.present]
            state.present = state.future[state.future.length - 1]
            state.future = state.future.slice(0, state.future.length - 1);
        }
    }
})

export const { push, redo, undo } = historySlice.actions

export default historySlice.reducer