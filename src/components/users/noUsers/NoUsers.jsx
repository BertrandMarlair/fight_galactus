import React from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/styles";
import Title from "../../typography/Title";
import style from "./NoUsersStyle";

const NoUsers = ({classes, lessPadding}) => {
    const {t} = useTranslation();

    const containerClasses = classNames({
        [classes.container]: true,
        [classes.lessPadding]: lessPadding,
    });

    const imgClasses = classNames({
        [classes.img]: true,
    });

    return (
        <div className={containerClasses}>
            <Title>{t("team.noUser")}</Title>
            <img src="/assets/illustrations/undraw_Team.svg" alt="no user" className={imgClasses} />
        </div>
    );
};

export default withStyles(style)(NoUsers);
