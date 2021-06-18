import React from "react";
import {useTranslation} from "react-i18next";
import {withStyles} from "@material-ui/core";
import Style from "./AlertStyle";
import Button from "../button/Button";
import SmallTitle from "../typography/SmallTitle";
import Text from "../typography/Text";
import Error from "../error/Error";

const Alert = ({classes, title, description, remove, onClose, loading, error}) => {
    const {t} = useTranslation();

    return (
        <div className={classes.root}>
            <SmallTitle bold>{title}</SmallTitle>
            <div className={classes.container}>
                <Text>{description}</Text>
                {error && <Error errorMessage={error} />}
                <div className={classes.buttonWrapper}>
                    <div className={classes.button}>
                        <Button loading={loading} noMargin color="error" onClick={() => remove()}>
                            {t("alert.button.yes")}
                        </Button>
                    </div>
                    <div>
                        <Button noMargin color="white" onClick={onClose}>
                            {t("alert.button.no")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withStyles(Style)(Alert);
