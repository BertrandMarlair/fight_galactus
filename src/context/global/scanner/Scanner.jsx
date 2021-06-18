/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import style from "./ScannerStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import Error from "../../../components/error/Error";
import QrReader from "react-qr-reader";
import Text from "../../../components/typography/Text";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import QrScanner from "react-qr-scanner";
import {useEffect} from "react";

const Scanner = ({classes}) => {
    const [error, setErrror] = useState(null);
    const [result, setResult] = useState(null);

    const previewStyle = {
        height: 240,
        width: 320,
    };

    const handleError = (err) => {
        console.error(err);
        setErrror(err);
    };

    const handleScan = (data) => {
        console.log(data);
        setResult(data);
    };

    useEffect(() => {
        let video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({video: true})
                .then((stream) => {
                    video.srcObject = stream;
                })
                .catch((err0r) => {
                    console.log("Something went wrong!");
                });
        }
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>SCANNER</Title>
            </div>
            {/* <QrReader delay={1000} /> */}
            <QrScanner delay={1000} />
            <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                    if (result) {
                        setResult(result.text);
                    } else {
                        setResult("Not Found");
                    }
                }}
            />
            <Error errorMessage={error} />
            <video autoPlay="true" id="videoElement"></video>
            <Text>{result}</Text>
        </div>
    );
};

export default withStyles(style)(Scanner);
