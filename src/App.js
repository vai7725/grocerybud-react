import { useEffect, useReducer } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Item from "./components/Item";
import { reducer } from "./components/Reducer";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const defaultState = {
    value: "",
    list: getLocalStorage(),
    isAlert: false,
    alertMsg: "",
    alertMsgStyle: "",
    isEditing: false,
    editID: null,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  const addListItem = (e) => {
    e.preventDefault();
    if (state.value) {
      const newItem = {
        id: new Date().getTime().toString(),
        value: state.value,
        isEditing: false,
      };
      dispatch({
        type: "add_item",
        payload: newItem,
      });
    }
    if (!state.value) {
      dispatch({
        type: "empty_value",
      });
    }
    // setValue("");
  };

  const deleteItem = (id) => {
    dispatch({
      type: "delete_item",
      payload: id,
    });
  };

  const editItem = (id) => {
    dispatch({
      type: "edit_item",
      payload: id,
    });
  };

  const listItem = state.list.map((item) => {
    const { id } = item;
    return (
      <Item key={id} {...item} deleteItem={deleteItem} editItem={editItem} />
    );
  });

  const closeAlert = () => {
    dispatch({
      type: "disable_alert",
    });
  };

  useEffect(() => {
    document.querySelector(".inp").focus();
  }, [state.isEditing]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state.list));
  }, [state.list]);

  return (
    <>
      <main>
        <section className="mainSection">
          {state.isAlert && (
            <Alert
              msg={state.alertMsg}
              bg={state.alertMsgStyle}
              closeAlert={closeAlert}
            />
          )}
          <div className="inputSection">
            <h1 className="title">grocery bud</h1>
            <form
              className="form"
              // onSubmit={
              //   state.isEditing
              //     ? dispatch({ type: "edit_list_item" })
              //     : addListItem
              // }
            >
              <input
                type="text"
                className="inp"
                placeholder="e.g. Bread"
                value={state.value}
                onChange={(e) =>
                  dispatch({ type: "set_value", payload: e.target.value })
                }
              />

              <button type="submit" className="btn" onClick={addListItem}>
                {!state.isEditing ? "Add" : "Edit"}
              </button>
              {/* <button
                type="submit"
                className="btn"
                onClick={dispatch({ type: "edit_list_item" })}
              >
                Edit
              </button> */}
            </form>
          </div>
          <div className="list">{listItem}</div>
          {state.list.length > 0 && (
            <p
              className="clearBtn"
              onClick={() => dispatch({ type: "clear_list" })}
            >
              Clear items
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
