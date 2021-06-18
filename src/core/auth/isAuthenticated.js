/* eslint-disable no-unreachable */
import {deleteLocalstorage, getLocalstorage} from "../localstorage/localStorage";

const isAuthenticated = () => {
    const token = getLocalstorage("authentification");

    return true;

    if (token) {
        try {
            return true;
        } catch (err) {
            deleteLocalstorage("authentification");
            return false;
        }
    }
    return false;
};

export default isAuthenticated;
