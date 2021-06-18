import {createStore, combineReducers, applyMiddleware} from "redux";

import ReduxThunk from "redux-thunk";

import connected from "../reducers/connectConfig";
import theme from "../reducers/themeConfig";

const rootReducer = combineReducers({
    connected,
    theme,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const configureStore = () => store;

export default configureStore;
