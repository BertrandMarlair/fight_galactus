import React, {useState, useEffect} from "react";
import notify from "../../core/snackbar/snackbar";
import {useSnackbar} from "notistack";

const NoInternetConnection = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [noInternetConnection, setNoInternetConnection] = useState(false);
    const [change, setChange] = useState(false);
    const [notifyKey, setNotifyKey] = useState(null);

    useEffect(() => {
        if (noInternetConnection && !change) {
            // on connection loss
            const key = enqueueSnackbar("la connection internet est perdue", {
                variant: "error",
                persist: true,
            });

            setNotifyKey(key);
            setChange(true);
        }
        if (!noInternetConnection && change) {
            closeSnackbar(notifyKey);
            notify("La connection internet est de retour !", {
                variant: "success",
                persist: false,
            });
            setChange(false);
        }
        // eslint-disable-next-line
    }, [noInternetConnection]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!navigator.onLine) {
                setNoInternetConnection(true);
            } else if (navigator.onLine && noInternetConnection) {
                setNoInternetConnection(false);
            }
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [noInternetConnection]);

    return <></>;
};

export default NoInternetConnection;
