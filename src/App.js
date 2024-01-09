import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from '../src/store';
import { Provider } from "react-redux";

import Login from "./view/login";
import Cadastro from "./view/cadastro";
import Home from "./view/home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
