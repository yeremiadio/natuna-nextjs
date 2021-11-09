import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

const encryptor = encryptTransform({
  secretKey: "myKey",
});

const authPersistConfig = {
  key: "root",
  storage: storage,
  transforms: [encryptor],
  blacklist: ["auth"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  errors: errorReducer,
});

export default appReducer;
