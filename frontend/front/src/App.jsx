import Header from "./components/Header";
import Todos from "./components/Todos";
import style from "./App.module.css"

function App() {
  return (
    <div className={style.container}>
    <Header/>
    <Todos/>
    </div>
  );
}

export default App;
