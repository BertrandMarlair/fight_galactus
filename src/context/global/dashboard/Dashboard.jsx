/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import style from "./DashboardStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import Card from "../../../components/card/Card";
import Avatar from "../../../components/avatar/Avatar";
import axios from "axios";
import {getLocalstorage} from "../../../core/localstorage/localStorage";
import Text from "../../../components/typography/Text";

const Dashboard = ({classes}) => {
    const api = window.api;
    const uid = getLocalstorage("authentification");

    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${api}/calculate.php`,
        })
            .then((res) => {
                console.log("res", res);
                setData(res?.data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (data) {
                console.log(data);
                setData((e) => {
                    return e.map((d) => ({...d, POINTS: parseInt(d.POINTS) + parseInt(d.INCREMENT)}));
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const currentPatrouille = data?.find((e) => e.CODE === uid);

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>FIGHT GALACTUS</Title>
            </div>
            <div className={classes.avatar}>
                <Avatar avatar="/assets/images/belier.jpg" size="bigger" />
            </div>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>Score: {parseInt(currentPatrouille?.POINTS)}</Title>
                <Title className={classes.title}>Croissance: {parseInt(currentPatrouille?.INCREMENT)} / SEC</Title>
            </div>
            <div>
                {data
                    ?.filter((e) => e.CODE !== uid)
                    ?.map((patrouille) => (
                        <Card key={`patrouille/${patrouille?.ID}`} className={classes.card}>
                            <div className={classes.headerinfo}>
                                <Avatar avatar={`/assets/images/${patrouille.LOGO}`} />
                                <SmallTitle className={classes.smallTitle}>{patrouille.NOM}</SmallTitle>
                            </div>
                            <Text className={classes.text}>
                                {parseInt(patrouille.POINTS)} | {parseInt(patrouille?.INCREMENT)}/sec
                            </Text>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default withStyles(style)(Dashboard);
