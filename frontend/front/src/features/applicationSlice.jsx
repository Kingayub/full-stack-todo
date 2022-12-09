import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  error:null,
  signingUp:false,
  signingIn:false,
  token:localStorage.getItem('token'),
  idUser: localStorage.getItem('id'),
  login:localStorage.getItem('login')
}

export const authSignUp = createAsyncThunk('auth/signup', async ({login,password},thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001/users', {
      method:'POST',
      body: JSON.stringify({login,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const json = await res.json()
    if(json.error) {
      thunkAPI.rejectWithValue(json.error)
    }
    return  json //
  } catch (e) {
    thunkAPI.rejectWithValue(e)
  }


})

export const authSignIn = createAsyncThunk('auth/signin', async  ({login,password}, thunkAPI)=> {
  try {
    const res = await fetch('http://localhost:3001/login', {
      method:'POST',
      body: JSON.stringify({login,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const token = await res.json()
    if (token.error) {
      return thunkAPI.rejectWithValue(token.error)
    }
    localStorage.setItem('token', token.token)
    localStorage.setItem('id',token.id)
    localStorage.setItem('login',token.login)

    return token
  } catch (e) {
    thunkAPI.rejectWithValue(e)
  }

})

const applicationSlice = createSlice({
  name:'application',
  initialState,
  reducers:{},
  extraReducers: (builder)=> {
    builder
      .addCase(authSignUp.pending,(state)=> {
        state.signingUp = true
        state.error = null
      })
      .addCase(authSignUp.rejected, (state, action)=> {
        state.signingUp = false
        state.error = action.payload
      })
      .addCase(authSignUp.fulfilled, (state, action)=> {
        state.signingUp = false
        state.error = null
      })
      .addCase(authSignIn.pending,(state)=> {
        state.signingIn = true
        state.error = null
      })
      .addCase(authSignIn.rejected, (state, action)=> {
        state.signingIn = false
        state.error = action.payload
      })
      .addCase(authSignIn.fulfilled, (state, action)=> {
        state.signingIn = false
        state.error = null
      })
  }
})

export default applicationSlice.reducer