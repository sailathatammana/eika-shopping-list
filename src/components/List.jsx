import { useState } from "react";
import React from "react";

import Welcome from "./Welcome";
import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader";
import Sort from "./Sort";
import Button from "./Button";
import Methods from "../services/Methods";

// This component can refactored into many many other components, and they can take the logic from here.
// because this component have methods for everything
export default function List() {
  // STATES
  const [filterResults, setFilterResults] = useState(
    Methods.getFilterSelected()
  );
  const [data, setData] = useState(Methods.getSavedListInLocalStorage());

  //sorting states
  const [sortBy, setSortBy] = useState(Methods.getSortBySelected());

  // Sorting/filtering logic
  let items = Methods.sortByTimestampOlderFirst(data);

  // You dont need to filter the completed items here
  // this make your app more complex that it ever needed to be
  if (filterResults) {
    if (sortBy === "price") {
      items = Methods.getOnlyAcquiredItems(Methods.sortByPrice(data));
    } else if (sortBy === "name") {
      items = Methods.getOnlyAcquiredItems(Methods.sortByName(data));
    } else {
      items = Methods.getOnlyAcquiredItems(
        Methods.sortByTimestampOlderFirst(data)
      );
    }
  } else {
    if (sortBy === "price") {
      items = Methods.sortByPrice(data);
    } else if (sortBy === "name") {
      items = Methods.sortByName(data);
    }
  }

  function sortByName() {
    setSortBy("name");
    Methods.saveSortBySelected("name");
  }

  function sortByPrice() {
    setSortBy("price");
    Methods.saveSortBySelected("price");
  }

  function sortByTimestamp() {
    setSortBy("timestamp");
    Methods.saveSortBySelected("timestamp");
  }

  // no console logs in production -1
  console.log(sortBy);

  function toggleFilter() {
    setFilterResults(!filterResults);
    Methods.saveFilterSelected(!filterResults);
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
    // you dont need to reload the page.
    // if you make all your states show empty it should re-render
  }

  return (
    <section className="shopping_list">
      {/* Having a if else where the if has 1 line of code ( <Welcome /> ) and the else has 29 lines of code, yes i counted, is a clear sign that you could refactor the else code into another component */}
      {data.length === 0 ? (
        <Welcome />
      ) : (
        <>
          <h1 className="title">My Shopping-List</h1>
          <Sort
            sortBy={sortBy}
            sortByName={sortByName}
            sortByPrice={sortByPrice}
            sortByTimestamp={sortByTimestamp}
            filterResults={filterResults}
            toggleFilter={toggleFilter}
          />
          <div className="list-container">
            {/* Name (readabilty) problem. IF List would be called Main or Normal, then this component should be name List */}
            <ListHeader />
            <ol>
              <>
                {items.map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </>
            </ol>
          </div>

          {(filterResults && Methods.getOnlyAcquiredItems(data).length) ===
            0 && (
            <span className="legend-middle">
              <p> No items found</p>
            </span>
          )}
        </>
      )}

      <div className="buttons">
        <Overlay type={"addItem"} />
        <Button handleClear={handleClear} length={data.length} />
      </div>
    </section>
  );
}
