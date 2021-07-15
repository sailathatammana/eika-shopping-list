import { useState } from "react";

import Overlay from "./Overlay";
import Methods from "../services/Methods";
import chair from "../assets/images/chair.jpg";

export default function Item({ item }) {
  //constants
  const [open, setOpen] = useState(false);

  //console.log(open)
  //console.log(list)

  // check an item - ok working
  function handleCheck() {
    const savedList = Methods.getSavedListInLocalStorage()
    const product = savedList.filter(function (i) {
      return i.id === item.id;
    });
    product[0].acquired = !product[0].acquired;

    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    otherProducts.push(product[0]);
    localStorage.setItem("list", JSON.stringify(otherProducts)); //save updated list
    window.location.reload();
  }

  // delete an item - ok working
  function handleDelete() {
    const savedList = Methods.getSavedListInLocalStorage()
    const otherProducts = savedList.filter(function (i) {
      return i.id !== item.id;
    });
    localStorage.setItem("list", JSON.stringify(otherProducts));
    window.location.reload();
  }

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <div className={"item" + (open ? " item-open" : "")}>
      <div className="lisere"> </div>
      <div className="item-data">
        <div>
        <img src={chair} alt="chair" width="20px"/>
          <Overlay item={item} type={"addImage"} />
        </div>

        <span>{item.name}</span>
        <span>
          <strong>{item.price}:-</strong>
        </span>

        <input
          className="checkbox"
          type="checkbox"
          checked={item.acquired}
          onChange={handleCheck}
        />
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