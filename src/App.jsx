import logo from "./assets/images/logo.png";
import ShoppingList from "./components/ShoppingList";
import Footer from "./components/Footer";

export default function App() {

  //localStorage.setItem("truc","pomme")


  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="logo" />
        <div className="filter">
        <p>Do you feel nostalgic ? </p>
        <input
          className="slider"
          type="checkbox"
          /* checked={filter}
          onChange={toggleFilter} */
        />
      </div>
      </header>
      <main>
        <ShoppingList />
      </main>
      <Footer />
    </div>
  );
}