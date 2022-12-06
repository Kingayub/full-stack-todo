import React, {useEffect, useState} from 'react';
import style from "./todos.module.css"
import {useDispatch, useSelector} from "react-redux";
import {addTodo, fetchTodos} from "../features/todoReducer";
import { SiCounterstrike } from "react-icons/si";
import {RiKnifeBloodLine} from "react-icons/ri";
import Todo from "./Todo";

const Todos = () => {
  const [input,setInput] = useState('')
  const inputHandler = (e)=> {
    setInput(e.target.value)
  }
  const todos = useSelector((state)=>state.todos )
  const error = useSelector((initialState)=> initialState.error)
  const loading = useSelector((initialState)=> initialState.loading)
  const dispatch = useDispatch()

  console.log(todos)

  const addTodoHandler = ()=> {
    dispatch(addTodo({input}))
    setInput("")
  }
  useEffect(()=> {
    dispatch(fetchTodos())
  },[dispatch])


  if (loading) {
    return (<div className={style.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>)
  }
  if(error) {
    return <div>{error}</div>
  }
  return (
    <div>
      <div>
        <input value={input} onChange={inputHandler}/>
        <button type="button" onClick={addTodoHandler}>Добавить</button>
        <div>
          {todos.map(todo=> {
            return <Todo star = {<SiCounterstrike/>}
                         title = {todo.title}
                         complited = {todo.complited}
                         deleteBtn = {<RiKnifeBloodLine/>}
                         id ={todo._id}/>
          })}
          </div>
        </div>
      </div>

  );
};

export default Todos;