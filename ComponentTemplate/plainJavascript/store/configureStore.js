import { createStore, applyMiddleware, compose } from "redux";
import { initialState } from "../ducks/index";
import rootReducer from "../ducks/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

// Chrome Redux Devtools extension support
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
