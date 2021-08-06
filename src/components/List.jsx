import { useState } from "react";
import React from "react";

import Welcome from "./Welcome";
import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader";
import Sort from "./Sort";
import Button from "./Button";
import Methods from "../services/Methods";

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

  console.log(sortBy);

  function toggleFilter() {
    setFilterResults(!filterResults);
    Methods.saveFilterSelected(!filterResults);
  }

  function handleClear() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <section className="shopping_list">
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
