import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./Tasks/tasksSlice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>