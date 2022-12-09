import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  users: []
}

export const fetchUsers = createAsyncThunk('users/fetch', async  (data, thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001/users/all', {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`
      }
    })
    const users = await res.json()
    if(users.error) {
      return thunkAPI.rejectWithValue(users.error)
    }
    return thunkAPI.fulfillWithValue(users)
  } catch (err) {
    thunkAPI.rejectWithValue(err)
  }
})

const userSlice = createSlice({
  name:'users',
  initialState,
  reducers:{},
  extraReducers: (builder)=> {
    builder
      .addCase(fetchUsers.fulfilled,(state, action)=> {
        state.users = action.payload
      })
  }
})


export default userSlice.reducer