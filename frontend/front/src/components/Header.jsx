import React from 'react';
import {useSelector} from "react-redux";
import style from "./todos.module.css"

const Header = () => {
  const loading = useSelector(state => state.loading)
  return (
    <>
      {!loading && <div className={style.header_todo}>TODO LIST FROM REDUX THUNK WITH BACK</div>}
    </>
  );
};

export default Header;