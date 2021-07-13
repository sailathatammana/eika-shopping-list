// Npm files
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// project files
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import BoughtPage from "./pages/BoughtPage";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/add" component={AddPage}/>
          <Route exact path="/bought" component={BoughtPage}/>
        </Switch>
      </BrowserRouter>
      {/* <h1>Shopping</h1> */}
    </div>
  );
}
