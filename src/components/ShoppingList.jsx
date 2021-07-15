import { useState } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";
import Methods from "../services/Methods";
import cart from "../assets/images/cart.png";

export default function ShoppingList() {
  // CONSTANTS

  const savedList = Methods.getSavedListInLocalStorage();
  const filteredList = Methods.getOnlyAcquiredItems(savedList);

  // STATES
  const [filterResults, setFilterResults] = useState(false);

  //console.log("filter", filter);
  //console.log("sorted",sortedList)
  //console.log("filtered",filteredList)

  function toggleFilter() {
    setFilterResults(!filterResults);
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="shopping_list">
      <img src={cart} alt="logo" width="200px"/>
      <h1 id="title">My Shopping-List</h1>

      <span className="legend">
        <div></div>
        {/* <p>Image</p> */}
        <p>Name</p>
        <p>Price</p>
      </span>

      <div className="hr"></div>

      <ol>
        {filterResults ? (
          <div>
            {filteredList.map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
          </div>
        ) : (
          <div>
            {savedList.map((item) => (
              <li key={item.id}>
                <Item item={item} />
              </li>
            ))}
          </div>
        )}
      </ol>

      <div className="filter">
        <p>View completed items</p>
        <input
          className="slider"
          type="checkbox"
          checked={filterResults}
          onChange={toggleFilter}
        />
      </div>

      <div className="buttons">
        <Overlay type={"addItem"} />
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          CLEAR ALL ITEMS
        </button>
      </div>
    </section>
  );
}