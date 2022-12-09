import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import usersSlice, {fetchUsers} from "../features/usersSlice";
import style from "./todos.module.css"


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=> state.usersSlice.users)
  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])
  return (
    <div>
      <ul className={style.users}>
        {users.map(item => {
          return <div key={item._id}><li>{item.login}</li> </div>
        })}
      </ul>
    </div>
  );
};

export default Users;