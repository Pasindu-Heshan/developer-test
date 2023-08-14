import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import ReaderHome from "./components/readerHome";
import CustomerHome from "./components/customerHome";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === true ? <ReaderHome /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/add-meter-readings" element={<ReaderHome />} />
          <Route path="/meter-readings" element={<CustomerHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
