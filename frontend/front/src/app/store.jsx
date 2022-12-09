import {configureStore} from "@reduxjs/toolkit";
import todosSlice from "../features/todoReducer";
import usersSlice from "../features/usersSlice";
import applicationSlice from "../features/applicationSlice";


export const store = configureStore({
  reducer: {
    todosSlice,
    usersSlice,
    applicationSlice
  }
})
