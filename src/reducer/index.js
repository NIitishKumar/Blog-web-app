import handleChange from "./inputChange";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',  
  storage,
  whitelist : ['handleChange']

}


const rootReducer = combineReducers({
  handleChange,
});

export default persistReducer(persistConfig,rootReducer);
