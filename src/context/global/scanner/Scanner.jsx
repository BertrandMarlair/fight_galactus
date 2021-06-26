/* eslint-disable react/no-unescaped-entities */
/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import style from "./ScannerStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import Error from "../../../components/error/Error";
import Text from "../../../components/typography/Text";
import Button from "../../../components/button/Button";
import QrScanner from "react-qr-scanner";
import Modal from "../../../components/modal/SimpleModal";
import Card from "../../../components/card/Card";
import Done from "../../../assets/images/done.png";
import {NavLink} from "react-router-dom";
import {getLocalstorage} from "../../../core/localstorage/localStorage";
import axios from "axios";

const Scanner = ({classes}) => {
    const api = window.api;
    const uid = getLocalstorage("authentification");

    const [error, setErrror] = useState(null);
    const [result, setResult] = useState(null);

    const handleError = (err) => {
        console.error(err);
        setErrror(err);
    };

    const handleScan = (data) => {
        if (data) {
            console.log(data);
            axios({
                method: "GET",
                url: `${api}/Scan.php`,
                headers: {
                    IdEquipe: uid,
                    IdPoste: data?.text,
                },
            })
                .then((res) => {
                    console.log("res", res);
                    axios({
                        method: "GET",
                        url: `${api}/GetAllPostes.php`,
                    })
                        .then((allPost) => {
                            console.log("end", allPost);
                            setResult(allPost?.data?.find((p) => p.URL === data?.text));
                        })
                        .catch((err) => {
                            console.log("err", err);
                        });
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }
    };

    const previewStyle = {
        height: 300,
        width: 300,
        border: "2px solid white",
    };

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>SCANNER</Title>
            </div>
            <div className={classes.scanner}>
                {!error && !result && (
                    <QrScanner
                        style={previewStyle}
                        delay={1000}
                        onScan={handleScan}
                        onError={handleError}
                        constraints={{audio: false, video: {facingMode: {exact: "environment"}}}}
                    />
                )}
            </div>
            <Modal open={Boolean(result)} onClose={() => setResult(null)} fullWidth>
                <Card className={classes.modalWrapper}>
                    <Title>Scan Effectué</Title>
                    <img className={classes.img} src={Done} alt="done" />
                    <SmallTitle>Vos point on été comptabilisé ! {result?.NOM} à été capturer</SmallTitle>
                    <SmallTitle>
                        Vous gagnez <span className={classes.points}>{result?.NBR_POINT}</span> points par secondes en
                        plus
                    </SmallTitle>
                    <SmallTitle>Foncez en récuperer d'autres !</SmallTitle>
                    <NavLink to="/app/dashboard">
                        <Button>Voir Nos Points</Button>
                    </NavLink>
                </Card>
            </Modal>
            <Error errorMessage={error} />
        </div>
    );
};

export default withStyles(style)(Scanner);
