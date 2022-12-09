import React from 'react';
import style from "./todos.module.css"
import {useDispatch, useSelector} from "react-redux";
import {deleteTodo, favoriteTodo} from "../features/todoReducer";
const Todo = ({id,star,title,complited,deleteBtn, todoUser}) => {
  const idU = useSelector((state)=> state.applicationSlice.idUser)
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteTodo({id}))
  }

  const favoriteHandler = () => {
    dispatch(favoriteTodo({id,complited}))
  }
  return (
    <div className={complited ? style.favorite : style.todos}>
      <div onClick={favoriteHandler}>
        {star}
      </div>
      <div>
        {title}
      </div>
      <div>
        {todoUser === idU ?  <span role="button" onClick={deleteHandler}> {deleteBtn}</span> :  <button disabled={true} >{deleteBtn}</button>}
      </div>
    </div>
  );
};

export default Todo;