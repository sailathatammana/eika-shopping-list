import React from "react";

import cart from "./assets/images/cart.png";
import "./css/style.scss";
import List from "./components/List";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <img className="img-main" src={cart} alt="img-main" width="200px" />
        <List />
      </main>
      <Footer />
    </div>
  );
}
