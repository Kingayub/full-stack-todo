import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  todos:[],
  error:null,
  loading:false
}

export const fetchTodos = createAsyncThunk('todos/fetch', async (_,thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001')
    const todos = await res.json()
    if(todos.error) {
      return thunkAPI.rejectWithValue(todos.error)
    }
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const addTodo = createAsyncThunk('todo/add/fetch', async (data, thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001', {
      method: 'POST',
      body: JSON.stringify({title:data.input}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const todos =await res.json()
    if(todos.error) {
      return thunkAPI.rejectWithValue(todos.error)
    }
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk('todo/delete/fetch', async (data, thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001/' + data.id, {
      method:'DELETE'
    })
    console.log("Deleted")
    return data.id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const favoriteTodo = createAsyncThunk('todo/favorite/fetch', async (data,thunkAPI)=> {
  try {
    const res = await fetch ('http://localhost:3001/' + data.id, {
      method:"PATCH",
      body:JSON.stringify({complited: !data.complited}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(data)
    const todo = await res.json()
    return thunkAPI.fulfillWithValue(todo)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const todosSlice = createSlice({
  name:"todos",
  initialState,
  reducers:{},
  extraReducers: (builder)=> {
    builder
      .addCase(fetchTodos.fulfilled, (state, action)=> {
        state.todos = action.payload
        state.loading = false
      })
      .addCase(fetchTodos.rejected, (state,action)=> {
        state.error = action.payload
        state.loading = false
      })
      .addCase(fetchTodos.pending, (state)=> {
        state.loading = true
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state,action)=> {
        state.loading = false
        state.todos.push(action.payload)
      })
      .addCase(addTodo.rejected, (state, action)=> {
        state.error = action.payload
        state.loading = false
      })
      .addCase(addTodo.pending, (state, action)=> {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state,action)=> {
        state.loading = false
        state.error = null
        state.todos = state.todos.filter((el)=> {
          if(el._id!==action.payload) {
            return el
          }
        })
      })
      .addCase(deleteTodo.rejected, (state, action)=> {
          state.error = action.payload
          state.loading = false
      })
      .addCase(deleteTodo.pending, (state, action)=> {
        state.loading = true
        state.error = null
      })
      .addCase(favoriteTodo.fulfilled, (state, action)=> {
        state.loading = false
        state.error = null
        state.todos = state.todos.map(el=> {
          if(el._id===action.payload._id) {
            el.complited = action.payload.complited
          }
          return el
        })
      })
      .addCase(favoriteTodo.rejected, (state, action)=> {
        state.error = action.payload
        state.loading = false
      })
      .addCase(favoriteTodo.pending, (state, action)=> {

      })
  }
})

export default todosSlice.reducer;

