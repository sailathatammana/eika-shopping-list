import React from "react";

import "./css/style.scss";
import List from "./components/List";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <List />
      </main>
      <Footer />
    </div>
  );
}
