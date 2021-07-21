import React from "react";

import logo from "./assets/images/logo.png";
import cart from "./assets/images/cart.png";
import "./css/style.scss";
import List from "./components/List";
import Footer from "./components/Footer";

export default function App() {
  
  return (
    <div className= "App">
      <header className="header">
        <img className="logo" src={logo} alt="logo" />
      </header>
      <main className= "main" >
      <img
            className="img-main" src={cart}  alt="img-main" width = "200px"
            />
        <List />
      </main>
      <Footer />
    </div>
  );
}