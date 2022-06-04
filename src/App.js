import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import Inicio from './componentes/Inicio';
import NavBar from './componentes/NavBar';
import Servicio from "./componentes/Servicio";
import { auth } from "./firebase";

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  },[])

  return (
    <div className="App">
      <Router>
        <NavBar firebaseUser={firebaseUser}></NavBar>
        <Routes>
          <Route path='/' exact element={<Inicio></Inicio>}></Route>
          <Route path='/mesadeservicio' exact element={<Inicio></Inicio>}></Route>
          <Route path='/Inicio' exact element={<Inicio></Inicio>}></Route>
          <Route path="/Servicio" exact element={<Servicio></Servicio>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;