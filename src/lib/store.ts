import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "@/store/taskSlice"; // adjust path if needed

const rootReducer = combineReducers({
  tasks: tasksReducer, // Make sure this is a reducer function
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;
