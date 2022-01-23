import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoriesReducer from "./reducers/category.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["categories"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
});

export default persistReducer(persistConfig, rootReducer);
