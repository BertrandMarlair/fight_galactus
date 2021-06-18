import {SNACKBAR_EVENT} from "../constants";
import {EventEmitter} from "../events/events";
import action from "./action";

export default (text, params) => {
    EventEmitter.dispatch(SNACKBAR_EVENT, {text, params: {...params, action}});
};
