import { React, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";
import Methods from "../services/Methods";

// Note: Two hundred lines of code for a component (my comments take about 10-15) is unnaceptable for any kind of development
// -1 (yes, the -1 is deducted per method and the returned jsX and another -1 for the component overall)
export default function AddItemOverlay({ type, item }) {
  //constants
  const [text, setText] = useState("");
  const [price, setPrice] = useState(-1);

  // you dont need to create a class,
  // you can make an object instead
  // you use classes when you have to add encapsulated properties and methods.
  // here you are just storing values, thats the job of the object data type
  // -1
  class Product {
    constructor(id, name, price, url, acquired, timestamp) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.url = url;
      this.acquired = acquired;
      this.timestamp = timestamp;
    }
  }

  //Manage the overlay
  const [isOpen, setOverlay] = useState(false);
  const closeOverlay = () => setOverlay(false);

  //overlay configuration
  const configs = {
    animate: true,
    clickDismiss: true,
    escapeDismiss: true,
    focusOutline: false,
    //contentClass: "overlay"
  };

  // This method is trying to do to much
  // no method with 30 lines of code should ever exist.
  // i will teach about making one parent method acting as a "boss" or "coordinator" to better handle this.
  // see t he example in image upload in my codebase. If i added all the image upload code in a single method it would be 50+ lines of code
  // 3R's readability point 4 Function length
  // -1
  const addItemToList = (e) => {
    e.preventDefault();
    // check that data entered is correct
    const isANumber = !isNaN(text);
    const emptyPrice = price === -1;

    if (
      typeof text == !"string" ||
      text.length < 3 ||
      text.length > 21 ||
      isANumber
    ) {
      alert("Please enter a valid name (3 - 20 characters) ");
    } else if (isNaN(price) || emptyPrice || price <= 0 || price > 100000) {
      alert("Please enter a valid price (1 - 100 000)");
    } else {
      const savedList = Methods.getSavedListInLocalStorage();

      let newItem = new Product(
        uuidv4(),
        text.toUpperCase(),
        price,
        /*      false, */
        Date.now()
      );

      savedList.push(newItem);
      Methods.saveListToLocalSorage(savedList);

      e.target.reset();
      closeOverlay();
      window.location.reload(); // use state management not reload -1
    }
  };

  // again this method is too long -1
  // edit an item - todo
  const editItem = (e) => {
    e.preventDefault();
    // check that data entered is correct
    if (
      typeof text == !"string" ||
      text.length === 0 ||
      text.length > 20 ||
      !isNaN(text)
    ) {
      alert("Please enter a valid name (max 20 characters) ");
    } else if (isNaN(price) || price <= 0 || price > 100000) {
      alert("Please enter a valid price (1 - 100 000)");
    } else {
      const currentList = JSON.parse(localStorage.getItem("list"));
      const product = currentList.filter(function (i) {
        return i.id === item.id;
      });

      product[0].name = text.toUpperCase();
      product[0].price = price;

      const otherProducts = currentList.filter(function (i) {
        return i.id !== item.id;
      });
      otherProducts.push(product[0]);
      localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
      window.location.reload(); // use state management not reload -1
    }
  };

  // Again this is too long, can be break down into smaller components
  // -1
  return (
    <div>
      {type === "addItem" && (
        <div>
          <button
            className="btn btn-oval btn-submit"
            onClick={() => {
              setOverlay(true);
            }}
          >
            {" "}
            ADD ITEM TO LIST{" "}
          </button>
          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay ">
              <form onSubmit={addItemToList}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter a new item..."
                ></input>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                ></input>

                <input
                  className="btn btn-oval btn-submit"
                  type="submit"
                  value="ADD ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}
      {type === "editItem" && (
        <div>
          <button
            className="btn btn-roll btn-edit"
            onClick={() => {
              setOverlay(true);
            }}
          >
            <i class="fas fa-edit"></i>
          </button>
          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}
          >
            <div className="overlay ">
              <form onSubmit={editItem}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Update name"
                ></input>
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                ></input>
                <input
                  className="btn btn-oval btn-submit"
                  type="submit"
                  value="EDIT ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}
    </div>
  );
}
