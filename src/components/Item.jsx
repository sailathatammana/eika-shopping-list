import { useState } from "react";

import Overlay from "./Overlay";
import Methods from "../services/Methods";

export default function Item({ item, reload }) {
  //constants
  const [open, setOpen] = useState(false);
  const isAcquired = Methods.getSavedListInLocalStorage().filter((i) => {
    return i.id === item.id;
  })[0].acquired;

  // check an item - ok working
  function handleCheck() {
    const savedList = Methods.getSavedListInLocalStorage();
    const product = savedList.filter(function (i) {
      return i.id === item.id;
    });
    product[0].acquired = !product[0].acquired;

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    Methods.saveListToLocalSorage(otherProducts);

    window.location.reload(); // use state management not reload -1
  }

  function handleDelete() {
    const savedList = Methods.getSavedListInLocalStorage();
    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    localStorage.setItem("list", JSON.stringify(otherProducts));
    window.location.reload(); // use state management not reload -1
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className={"item" + (open ? " item-open" : "")}>
      <div className="lisere"> </div>
      <div className={"item-data" + (isAcquired ? " item-data-acquired" : "")}>
        <span className="data">{item.name}</span>
        <span className="data">
          <strong>{item.price}</strong>
        </span>

        <div class="exp">
          <div class="checkbox">
            <input
              type="checkbox"
              id={"cbx-" + item.id}
              name="check"
              checked={isAcquired}
              onChange={handleCheck}
            />
            <label for={"cbx-" + item.id}>
              <span></span>
            </label>
          </div>
        </div>
      </div>

      {open === true ? (
        <div className="drawer">
          <button className="btn btn-roll btn-drawer" onClick={toggleDrawer}>
            <i class="far fa-window-close"></i>
          </button>

          <div className="content">
            <Overlay type={"editItem"} item={item} />
            <button className="btn btn-roll btn-delete" onClick={handleDelete}>
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="drawer">
          <button className="btn btn-drawer" onClick={toggleDrawer}>
            <i class="fas fa-expand-arrows-alt"></i>
          </button>
        </div>
      )}
    </div>
  );
}
