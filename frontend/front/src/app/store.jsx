import {configureStore} from "@reduxjs/toolkit";
import todosSlice from "../features/todoReducer";


export const store = configureStore({
  reducer: todosSlice
})
