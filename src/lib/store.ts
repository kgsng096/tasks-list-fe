import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "@/store/taskSlice";
import csrfReducer from "@/store/csrfSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      csrf: csrfReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
