import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Create the Redux store with the middleware
const store = createStore(rootReducer, applyMiddleware(...middleware));

// run the root saga
sagaMiddleware.run(rootSaga);

export default store;
