import categoriesReducer from "./reducers/categoriesReducer";
import { createStore, combineReducers } from "redux";
import bookReducer from "./reducers/bookReducer";

const rootReducer = combineReducers({
  categoriesState: categoriesReducer,
  bookState: bookReducer,
});
const store = createStore(rootReducer);
export default store;
