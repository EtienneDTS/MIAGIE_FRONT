import { useState } from "react";
import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { GetAll } from "./pages/GetAll";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";

import { AddWizard } from "./pages/AddWizard";

function App() {
  const [loggedUser, setLoggedUser] = useState<any>(null);

  return (
    <Router>
      <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
      <Routes>
        <Route path="/" element={<Home loggedUser={loggedUser}/>} />
        <Route
          path="/eleve/:id"
          element={<Detail path="eleve" loggedUser={loggedUser} />}
        />
        <Route
          path="/professeur/:id"
          element={<Detail path="professeur" loggedUser={loggedUser} />}
        />
        <Route path="/eleves" element={<GetAll about={1} />} />
        <Route path="/profs" element={<GetAll about={2} />} />
        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
        <Route path="/ajouter" element={<AddWizard />} />
      </Routes>
      
    </Router>
  );
}

export default App;
