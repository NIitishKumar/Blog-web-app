import { createStore } from "redux";
import rootReducer from "./reducer/index";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import localStorage from 'redux-persist/lib/storage' 
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";



const persistConfig = {
  key: 'root',  
  storage,

}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default  () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
