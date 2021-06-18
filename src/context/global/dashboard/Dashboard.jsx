import React from "react";
import style from "./DashboardStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";
import SmallTitle from "../../../components/typography/SmallTitle";
import Card from "../../../components/card/Card";
import Avatar from "../../../components/avatar/Avatar";

const Dashboard = ({classes}) => {
    const patrouillesScore = [
        {
            id: 1,
            name: "Belier",
            score: 2345,
            avatar: "/assets/images/scout.png",
        },
        {
            id: 2,
            name: "Mouette",
            score: 5678,
            avatar: "/assets/images/scout.png",
        },
        {
            id: 3,
            name: "Vache",
            score: 4567,
            avatar: "/assets/images/scout.png",
        },
    ];

    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>FIGHT GALACTUS</Title>
            </div>
            <div className={classes.avatar}>
                <Avatar avatar="/assets/images/scout.png" size="bigger" />
            </div>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>Score: 12345</Title>
            </div>
            <div>
                {patrouillesScore?.map((patrouille) => (
                    <Card key={`patrouille/${patrouille?.id}`} className={classes.card}>
                        <Avatar avatar={patrouille.avatar} />
                        <SmallTitle className={classes.smallTitle}>
                            {patrouille.name}: {patrouille.score}
                        </SmallTitle>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default withStyles(style)(Dashboard);
