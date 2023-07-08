import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import AddUser from "./components/AddUser/AddUser";
import ConfirmEmail from "./components/AddUser/ConfirmEmail";

function App() {
  return (
    <div className={'app'} >
        <Routes>
            <Route path="/" element={ <AddUser/> } />
            <Route path="/home" element={ <Home/> } />
            <Route path="/confirm-email/:code" element={ <ConfirmEmail/> } />
        </Routes>
    </div>
  );
}

export default App;
