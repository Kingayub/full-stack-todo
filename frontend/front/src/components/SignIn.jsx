import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {authSignIn} from "../features/applicationSlice";
import style from "./todos.module.css"
import {Navigate, Route} from "react-router-dom";

const SignIn = () => {
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSetName = (e) => {
    setLogin(e.target.value)
  }
  const handleSetPass = (e)=> {
    setPassword(e.target.value)
  }
  const handleSignIn = (e)=> {
    e.preventDefault()
    dispatch(authSignIn({login,password}))
    setLogin("")
    setPassword('')
  }
  const handleWelcomePage = () => {
    <Route path="/login" element={<Navigate to = '/todos'/>}/>
    window.location.reload()
  }

  return (
    <form onSubmit={handleSignIn} className={style.signin}>
      <input
        type="text"
        value={login}
        placeholder='login...'
        onChange={handleSetName}
      />
      <br/>
      <input
        type="password"
        value={password}
        placeholder='password'
        onChange={handleSetPass}
      />
      <br/>
      <button type="submit" onClick={handleWelcomePage}>Войти</button>
    </form>
  );

  return (
    <div>

    </div>
  );
};

export default SignIn;