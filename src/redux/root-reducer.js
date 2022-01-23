import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoriesReducer from "./reducers/categories.reducer";
import servicesReducer from "./reducers/services.reducer";
import tokenReducer from "./reducers/token.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["categories", "services", "token"],
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  services: servicesReducer,
  token: tokenReducer,
});

export default persistReducer(persistConfig, rootReducer);
