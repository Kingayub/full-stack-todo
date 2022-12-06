import React from 'react';
import style from "./todos.module.css"
import {useDispatch} from "react-redux";
import {deleteTodo, favoriteTodo} from "../features/todoReducer";
const Todo = ({id,star,title,complited,deleteBtn}) => {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteTodo({id}))
  }

  const favoriteHandler = () => {
    dispatch(favoriteTodo({id,complited}))
  }
  return (
    <div className={complited ? style.todos : style.favorite}>
      <div onClick={favoriteHandler}>
        {star}
      </div>
      <div>
        {title}
      </div>
      <div>
        <span role="button" onClick={deleteHandler}> {deleteBtn}</span>
      </div>
    </div>
  );
};

export default Todo;