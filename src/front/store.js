export const initialStore = () => {
  return {
    contacts: [],
    currentContact: {},
    isEdit: false
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "contacts":
      return { ...store, contacts: action.payload };

      case "currentContact":
      return { ...store, currentContact: action.payload };


      case "isEdit":
      return { ...store, isEdit: action.payload };


    default:
      throw Error("Unknown action.");
  }
}
