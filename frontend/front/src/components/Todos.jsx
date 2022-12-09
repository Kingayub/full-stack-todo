import React, {useEffect, useState} from 'react';
import style from "./todos.module.css"
import {useDispatch, useSelector} from "react-redux";
import todosSlice, {addTodo, fetchTodos} from "../features/todoReducer";
import usersSlice from "../features/usersSlice";
import { SiCounterstrike } from "react-icons/si";
import {RiKnifeBloodLine} from "react-icons/ri";
import Todo from "./Todo";
import Header from "./Header";

const Todos = () => {
  const [input,setInput] = useState('')
  const inputHandler = (e)=> {
    setInput(e.target.value)
  }
  const todos = useSelector((state)=>state.todosSlice.todos )
  const error = useSelector((initialState)=> initialState.todosSlice.error)
  const loading = useSelector((initialState)=> initialState.todosSlice.loading)
  const idU = useSelector((state)=> state.applicationSlice.idUser)


  const dispatch = useDispatch()

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
    <div className={style.container}>
      <Header/>
      <div>
        <input value={input} onChange={inputHandler}/>
        <button type="button" onClick={addTodoHandler}>Добавить</button>
        <div>
          {todos.map(todo=> {
            if(todo.user === idU) {
              return (
                  <Todo star = {<SiCounterstrike/>}
                        title = {todo.title}
                        complited = {todo.complited}
                        deleteBtn = {<RiKnifeBloodLine/>}
                        id ={todo._id}
                        todoUser = {todo.user}
                  />
                  )
            }
          })}
          </div>
        </div>
      </div>

  );
};

export default Todos;