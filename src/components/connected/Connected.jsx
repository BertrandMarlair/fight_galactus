import React from "react";
import {useSelector} from "react-redux";

const Connected = ({children}) => {
    const connect = useSelector((state) => state.connected);
    const {connected} = connect;

    if (connected) {
        return children;
    }
    return <></>;
};

export default Connected;
