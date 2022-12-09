import Header from "./components/Header";
import Todos from "./components/Todos";
import style from "./App.module.css"
import {Navigate, Route, Routes,Link} from "react-router-dom";
import applicationSlice from "./features/applicationSlice";
import Users from "./components/Users";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import {useSelector} from "react-redux";
import Todo from "./components/Todo";
import HomePage from "./components/HomePage";
import {useEffect} from "react";

function App() {
  let token = useSelector(state=> state.applicationSlice.token)
  let login = useSelector((state)=> state.applicationSlice.login)
  let idU = useSelector((state)=> state.applicationSlice.idUser)


  const handleExit = () => {
    token = localStorage.removeItem('token')
    login = localStorage.removeItem('login')
    idU = localStorage.removeItem('id')

    window.location.reload()
  }
  // const handleExit=()=> {
  //
  // }
  if(!token) {
    return (
      <>
        <div >
          <nav className={style.links_without_token}>
            <Link to='/'>Home</Link>
            <Link to ='/auth'>Регистрация</Link>
            <Link to ='/users'>Войти</Link>
          </nav>
        </div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/users" element={<Navigate to = '/login'/>}/>
          <Route path='/auth' element={<SignUp/>}/>
          <Route path='/login' element={<SignIn/>}/>
        </Routes>
      </>
    )
  }
  return (
    <>
      <div>
        <nav className={style.links_with_token}>
          <Link to ='/users'>Пользователи</Link>
          <Link to ='/todos'>Тудушки</Link>
          <Link to='/'><button onClick={handleExit}>Выйти</button></Link>
          {`Добро пожаловать ${login}`}
        </nav>
      </div>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path="/login" element={<Navigate to = '/users'/>}/>
        <Route path='/todos' element={<Todos/>}/>
      </Routes>
    </>

  )
}

export default App;
