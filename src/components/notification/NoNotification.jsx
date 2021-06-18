import React from "react";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import style from "./NoNotificationStyle";
import Title from "../typography/Title";
import Card from "../card/Card";

const NoNotification = ({classes}) => {
    const {t} = useTranslation();

    return (
        <Card noMargin className={classes.container}>
            <div>
                <Title bold>{t("log.noLogs.title")}</Title>
                <img
                    src="/assets/illustrations/undraw_new_notifications_fhvw.svg"
                    alt="notification"
                    className={classes.img}
                />
            </div>
        </Card>
    );
};

export default withStyles(style)(NoNotification);
