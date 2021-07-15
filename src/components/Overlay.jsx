import { React, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import Overlay from "react-overlay-component";  
import Dropzone from "./Dropzone";
import Methods from "../services/Methods";

export default function AddItemOverlay({/*  list */ type, item }) {
  //constants
  const [text, setText] = useState("");
  const [price, setPrice] = useState(-1);

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
    focusOutline: true,
  };


  const addItemToList = (e) => {
    e.preventDefault();
    // check that data entered is correct
    const isANumber = !isNaN(text)
    const emptyPrice = price === -1

    if (
      typeof text == !"string" ||
      text.length < 3 ||
      text.length > 21 ||
      isANumber
    ) {
      alert("Please enter a valid name (3 - 20 characters) ");

    } else if (isNaN(price) || emptyPrice || price > 100000) {
      alert("Please enter a valid price (max 100 000)");
    } else {

    const savedList = Methods.getSavedListInLocalStorage()
      

      //const defaultImgUrl = "https://www.google.com/search?q=chair&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8hM6-q-LxAhXPtYsKHfBBAjIQ_AUoAXoECAIQAw&biw=1280&bih=577#imgrc=DLtoK1KGJ3wQaM";
      let newItem = new Product(
        uuidv4(),
        text.toUpperCase(),
        price,
        //defaultImgUrl,
        false,
        Date.now()
      );

      savedList.push(newItem);
      Methods.saveListToLocalSorage(savedList);

      e.target.reset();
      closeOverlay();
      window.location.reload();
    }
  };

  // edit an item - todo
  const editItem = (e) => {
    e.preventDefault()
    // check that data entered is correct
    if (
      typeof text == !"string" ||
      text.length === 0 ||
      text.length > 20 ||
      !isNaN(text)
    ) {
      alert("Please enter a valid name (max 20 characters) ");
    }else if (isNaN(price) || price === -1 || price > 100000) {
      alert("Please enter a valid price (max 100 000)");
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
      window.location.reload();
    }
  }

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
            ADD ITEM{" "}
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
                  className="btn  btn-submit"
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
          <button className="btn btn-roll btn-edit"
              onClick={() => {
                setOverlay(true);
              }}>
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
                  className="btn  btn-submit"
                  type="submit"
                  value="EDIT ITEM"
                ></input>
              </form>
            </div>
          </Overlay>
        </div>
      )}

      {type === "addImage" && (
        <div>
          <button
            className="btn img-overlay"
            onClick={() => {
              setOverlay(true);
            }}>
             +
          </button>
          <Overlay
            configs={configs}
            isOpen={isOpen}
            closeOverlay={closeOverlay}>
            <div className="overlay-dropzone">           
              <Dropzone item={item} />            
            </div>
          </Overlay>
        </div>
      )}
    </div>
  );
}