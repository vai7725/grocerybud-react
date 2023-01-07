import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Item = (props) => {
  const { id, value, editItem, deleteItem } = props;
  // console.log(props);
  return (
    <>
      <div className="item">
        <p>{value}</p>
        <div className="buttons">
          <button className="editBtn actionBtn" onClick={() => editItem(id)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="deleteBtn actionBtn">
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(id)} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
