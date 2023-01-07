export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "set_value") {
    return {
      ...state,
      value: payload,
    };
  }
  if (type === "add_item") {
    if (state.editID !== null) {
      console.log(state);
      const edited = state.list.map((item) => {
        if (item.id === state.editID) {
          return {
            ...item,
            value: state.value,
          };
        } else {
          return { ...item };
        }
      });
      return {
        ...state,
        value: "",
        list: edited,
        isAlert: true,
        alertMsg: "Item edited",
        alertMsgStyle: "#d3f8d6",
        isEditing: false,
        editID: null,
      };
    } else {
      const newItems = [...state.list, payload];
      return {
        ...state,
        value: "",
        list: newItems,
        isAlert: true,
        alertMsg: "item added",
        alertMsgStyle: "#d3f8d6",
      };
    }
  }
  if (type === "clear_list") {
    return {
      ...state,
      list: [],
      isAlert: true,
      alertMsg: "items cleard",
      alertMsgStyle: "#fbcbbe",
    };
  }
  if (type === "disable_alert") {
    return {
      ...state,
      isAlert: false,
    };
  }
  if (type === "empty_value") {
    return {
      ...state,
      isAlert: true,
      alertMsg: "Please enter a value",
      alertMsgStyle: "#fbcbbe",
    };
  }
  if (type === "delete_item") {
    const newItem = state.list.filter((item) => item.id !== payload);
    return {
      ...state,
      list: newItem,
      isAlert: true,
      alertMsg: "Item deleted",
      alertMsgStyle: "#fbcbbe",
    };
  }
  if (type === "edit_item") {
    const target = state.list.find((item) => item.id === payload);
    return {
      ...state,
      value: target.value,
      isEditing: true,
      editID: payload,
    };
  }
  // if (type === "edit_list_item") {
  //   const edited = state.list.map((item) => {
  //     if (item.id === state.editID) {
  //       return {
  //         ...item,
  //         value: state.value,
  //       };
  //     } else {
  //       return { ...item };
  //     }
  //   });
  //   return {
  //     ...state,
  //     list: edited,
  //   };
  // }
};
