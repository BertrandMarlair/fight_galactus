import React, {useEffect, useState} from "react";
import style from "./DetailsStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import axios from "axios";
import Card from "../../../components/card/Card";
import Avatar from "../../../components/avatar/Avatar";
import SmallTitle from "../../../components/typography/SmallTitle";
import {getLocalstorage} from "../../../core/localstorage/localStorage";
import {useFilterList} from "../../../core/hooks/useFilteredList";
import moment from "moment";
import Icon from "../../../components/icon/Icon";
import Input from "../../../components/input/Input";

const Details = ({classes}) => {
    const api = window.api;
    const uid = getLocalstorage("authentification");

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [currentTeam, setCurrentTeam] = useState(null);

    const dataList = useFilterList(data, search);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${api}/GetAllPostes.php`,
        })
            .then((allPost) => {
                setData(allPost?.data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${api}/calculate.php`,
        })
            .then((res) => {
                setCurrentTeam(res?.data?.find((e) => e.CODE === uid));
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (data && currentTeam) {
                setCurrentTeam((e) => ({...e, POINTS: parseInt(e.POINTS) + parseInt(e.INCREMENT)}));
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const calculateTiming = (poste, current) => {
        const neededPoint = parseInt(poste.POINT_TO_SPEND) - parseInt(current.POINTS);
        const increment = current.INCREMENT;
        const currentTime = new Date().getTime();

        console.log(neededPoint, neededPoint / increment, new Date(currentTime + neededPoint / increment));
        return moment(new Date(currentTime + (neededPoint / increment) * 1000)).fromNow();
    };

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>DETAILS</Title>
            </div>
            <div className={classes.input}>
                <Input
                    placeholder={"Chercher"}
                    endAdornment={<Icon light>Search</Icon>}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            <div className={classes.container}>
                {dataList
                    .sort((a, b) => parseInt(a?.POINT_TO_SPEND) - parseInt(b?.POINT_TO_SPEND))
                    ?.map((poste, index) => (
                        <Card key={`poste/${index}`} className={classes.card}>
                            <div className={classes.wrapper}>
                                <div className={classes.headerinfo}>
                                    <Avatar avatar={`/assets/images/${poste.LOGO}`} />
                                    <SmallTitle className={classes.smallTitle}>{poste?.NOM}</SmallTitle>
                                </div>
                                <SmallTitle>{parseInt(poste.POINT_TO_SPEND)}</SmallTitle>
                            </div>
                            {poste?.NOM_EQUIPE && (
                                <div className={classes.possession}>
                                    <SmallTitle className={classes.smallTitle}>Possession actuel: </SmallTitle>
                                    <div className={classes.possessionWrapper}>
                                        <Avatar avatar={`/assets/images/${poste.LOGO_EQUIPE}`} />
                                        <SmallTitle className={classes.smallTitle}>{poste.NOM_EQUIPE}</SmallTitle>
                                    </div>
                                </div>
                            )}
                            {poste.NOM_EQUIPE !== currentTeam?.NOM && (
                                <div className={classes.possession}>
                                    {parseInt(poste.POINT_TO_SPEND) > parseInt(currentTeam?.POINTS) ? (
                                        <SmallTitle className={classes.smallTitle}>
                                            Vous avez besoin de{" "}
                                            {parseInt(poste.POINT_TO_SPEND) - parseInt(currentTeam?.POINTS)} pour
                                            acheter acheter acheter ce poste ({calculateTiming(poste, currentTeam)} à
                                            cette actuelle)
                                        </SmallTitle>
                                    ) : (
                                        <SmallTitle className={classes.smallTitle}>
                                            Vous pouvez acheter ce poste
                                        </SmallTitle>
                                    )}
                                </div>
                            )}
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default withStyles(style)(Details);
