import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ITask = {
    id: string;
    name: string;
    color: string;
    isDone: boolean;
}

type IUpdateTask = {
    index: number;
    name: string;
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [] as ITask[],
    },
    reducers: {
        setTaskBySavedTasks(state, { payload }) {
            state.tasks = payload;
        },
        addTask(state, { payload }: PayloadAction<ITask>) {
            state.tasks = [payload, ...state.tasks];
        },
        removeTask(state, { payload }) {
            state.tasks.splice(payload, 1);
        },
        updateTask(state, { payload }: PayloadAction<IUpdateTask>) {
            state.tasks[payload.index].name = payload.name;
        },
        doneTask(state, { payload }) {
            state.tasks[payload].isDone = true;
        }
    },
});

export default tasksSlice.reducer;
export const { 
    addTask, 
    removeTask, 
    doneTask, 
    updateTask, 
    setTaskBySavedTasks,
} = tasksSlice.actions;
