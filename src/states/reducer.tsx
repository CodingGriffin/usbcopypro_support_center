import { combineReducers } from "redux";

import usbcopyReducer from "./UsbCopyUpdates/reducer";

const rootReducer = combineReducers({
  usbcopyUpdates: usbcopyReducer,
});

export default rootReducer;
