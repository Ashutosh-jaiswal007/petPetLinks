import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const initialstate = {
  login: false,
  toggle: true,
};

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: !state.login,
      };
    case "TIMELINE_CLICK_TOGGLE_STATE":
      return {
        ...state,
        toggle: true,
      };
    case "MYUPLOADS_CLICK_TOGGLE_STATE":
      return {
        ...state,
        toggle: false,
      };
    default:
      return state;
  }
};
// const persistconfig =
// {
//     key:'root',
//     storage,
//     whitelist:['reducer']
// }

export default reducer;
