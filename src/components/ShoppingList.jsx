import { useState } from "react";
import React from "react";

import Item from "./Item";
import Overlay from "./Overlay";
import ListHeader from "./ListHeader";
import Methods from "../services/Methods";

export default function ShoppingList() {
  // STATES
  const [filterResults, setFilterResults] = useState(
    Methods.getFilterSelected()
  );
  const [data, setData] = useState(Methods.getSavedListInLocalStorage());

  //sorting states
  const [sortBy, setSortBy] = useState(Methods.getSortBySelected());

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
      {data.length > 0 ? (
        <div>
          <div className="filter-sort">
            <div className="sort">
            <p className="sort-label">Sort by</p>
              <div className="box-sort">

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="name"
                  checked={sortBy === "name"}
                  onClick={sortByName}
                />
                <label className="label-for-check" htmlFor="name">
                  A→Z
                </label>
              </div>

              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="price"
                  checked={sortBy === "price"}
                  onClick={sortByPrice}
                />

                <label className="label-for-check" htmlFor="price">
                  Price 
                </label>
              </div >

              <div className="btn-sort">
              <button onClick={sortByTimestamp}>  
                Reset
              </button>
              </div>
            </div>
              </div>
              
            <div className="filter">
              {/* <p>Acquired products</p> */}
             
              {/* <div className="slider">
                <input
                  type="checkbox"
                  checked={filterResults}
                  onChange={toggleFilter}
                />
              </div> */}
              <div className="btn-sort">
                <input
                  className="check-with-label"
                  type="checkbox"
                  id="acquired"
                  checked={filterResults}
                  onClick={toggleFilter}
                />

                <label className="label-for-check" htmlFor="acquired">
                  Owned 
                </label>
              </div>

            </div>
          </div>
          <ListHeader />
        </div>
      ) : (
        <div className="emptylist">
          <div className="arrowdown"></div>
          <p> Add your first item </p>
        </div>
      )}

      <ol>
        {filterResults ? (
          <div>
            {sortBy === "price" && (
              <div>
                {Methods.sortByPrice(Methods.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} />
                    </li>
                  )
                )}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {Methods.sortByName(Methods.getOnlyAcquiredItems(data)).map(
                  (item) => (
                    <li key={item.id}>
                      <Item item={item} />
                    </li>
                  )
                )}
              </div>
            )}

            {sortBy === "timestamp" && (
              <div>
                {Methods.sortByTimestampOlderFirst(
                  Methods.getOnlyAcquiredItems(data)
                ).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}

            {Methods.getOnlyAcquiredItems(data).length === 0 && (
              <span className="legend-middle">
                <p> No items found</p>
              </span>
            )}
          </div>
        ) : (
          <div>
            {sortBy === "price" && (
              <div>
                {Methods.sortByPrice(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}
            {sortBy === "name" && (
              <div>
                {Methods.sortByName(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}

          {sortBy === "timestamp" && (
              <div>
                {Methods.sortByTimestampOlderFirst(data).map((item) => (
                  <li key={item.id}>
                    <Item item={item} />
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
      </ol>

      {/*  <ListFooter/> */}

      <div className="buttons">
        <Overlay type={"addItem"} />
        <button className="btn btn-oval btn-clear" onClick={handleClear}>
          REMOVE ALL ITEMS
        </button>
      </div>
    </section>
  );
}