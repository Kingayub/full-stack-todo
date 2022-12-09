import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {authSignUp} from "../features/applicationSlice";
import style from "./todos.module.css"


const SignUp = () => {
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSetName = (e) => {
    setLogin(e.target.value)
  }
  const handleSetPass = (e)=> {
    setPassword(e.target.value)
  }
  const handleSignUp = (e)=> {
    e.preventDefault()
    dispatch(authSignUp({login,password}))
    setLogin('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSignUp} className={style.signup}>
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
      <button type="submit">Регистрация</button>
    </form>
  );
};

export default SignUp;