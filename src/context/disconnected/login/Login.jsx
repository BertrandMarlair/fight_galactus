/* eslint-disable react/no-unescaped-entities */
import React, {Fragment, useState} from "react";
import style from "./LoginStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import QrScanner from "react-qr-scanner";
import Error from "../../../components/error/Error";
import {setLocalstorage} from "../../../core/localstorage/localStorage";

const Login = ({classes, history}) => {
    const started = window.started;

    const [error, setErrror] = useState(null);
    const [result, setResult] = useState(null);

    const handleError = (err) => {
        console.error(err);
        setErrror(err);
    };

    const handleScan = (data) => {
        if (data) {
            console.log(data);
            setResult(data?.text);
            setLocalstorage("authentification", data?.text);
            history.push("/app/dashboard");
        }
    };

    const previewStyle = {
        height: 300,
        width: 300,
        border: "2px solid white",
    };

    return (
        <div className={classes.root}>
            {started ? (
                <Fragment>
                    <div className={classes.textWrapper}>
                        <Title className={classes.title}>BIENVENUE</Title>
                        <SmallTitle>Veuillez scanner votre QR code d'équipe pour commencer !</SmallTitle>
                    </div>
                    {!error && !result && (
                        <QrScanner
                            style={previewStyle}
                            delay={1000}
                            // legacyMode={true}
                            onScan={handleScan}
                            onError={handleError}
                            constraints={{audio: false, video: {facingMode: {exact: "environment"}}}}
                        />
                    )}
                    {error && (
                        <SmallTitle centered>
                            Ce navigateur ne fonctionne pas avec le scanner de QRCode, utilisez en un autre ou changez
                            de téléphone
                        </SmallTitle>
                    )}
                    {result && JSON.stringify(result)}
                    <Error errorMessage={error} />
                </Fragment>
            ) : (
                <div className={classes.textWrapper}>
                    <Title>BIENVENUE</Title>
                    <SmallTitle>La chasse n'est pas encore ouverte, patience !</SmallTitle>
                </div>
            )}
        </div>
    );
};

export default withStyles(style)(Login);
