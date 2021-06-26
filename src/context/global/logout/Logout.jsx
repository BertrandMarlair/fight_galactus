import React, {useEffect} from "react";
import {deleteLocalstorage} from "../../../core/localstorage/localStorage";

const Logout = ({history}) => {
    useEffect(() => {
        deleteLocalstorage("authentification");
        history.push("/connect/login");
    }, []);

    return <div></div>;
};

export default Logout;
