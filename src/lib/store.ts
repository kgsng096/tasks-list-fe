import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "@/store/taskSlice";
import csrfReducer from "@/store/csrfSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  csrf: csrfReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;
