import React, {useState, useEffect, Fragment} from "react";
import {withStyles, useTheme} from "@material-ui/core";
import DateStyle from "./DateStyle";
import moment from "moment";
import classNames from "classnames";
import {ONE_DAY, ONE_HOUR} from "../../core/constants";
import Text from "../typography/Text";
import Point from "../point/Point";
import {useTranslation} from "react-i18next";

const CustomDate = ({
    classes,
    date: getDate,
    children,
    fromNow,
    format,
    startOf,
    endOf,
    condition,
    refresh,
    bold,
    small,
    margin,
    className,
    showYear,
}) => {
    const [update, setUpdate] = useState(0);
    const theme = useTheme();
    const {t} = useTranslation();

    useEffect(() => {
        if (refresh && getDate < ONE_HOUR) {
            setTimeout(() => {
                setUpdate(update + 1);
            }, 10000);
        }
    }, [setUpdate, update, refresh, getDate]);

    const checkValidity = () => {
        if (!condition) {
            if (new Date(moment(children)._d).getTime() < Date.now()) {
                return theme.palette.error.main;
            } else if (new Date(moment(getDate)._d).getTime() < Date.now()) {
                return theme.palette.error.main;
            } else if (new Date(moment(getDate)._d).getTime() < Date.now() + ONE_DAY * 2) {
                return theme.palette.warning.main;
            }
            return theme.palette.success.main;
        }
        return true;
    };

    const dateClasses = classNames({
        [classes.date]: true,
        [classes.late]: (condition === true || condition === false) && checkValidity() === theme.palette.error.main,
        [classes.warning]:
            (condition === true || condition === false) && checkValidity() === theme.palette.warning.main,
        [className]: className,
    });

    const renderDate = () => {
        if (children || getDate) {
            if (format && format.length > 0) {
                return moment(children || getDate).format(format);
            } else if (startOf && startOf.length > 0) {
                return moment(children || getDate)
                    .startOf(startOf)
                    .fromNow();
            } else if (endOf && endOf.length > 0) {
                return moment(children || getDate)
                    .endOf(endOf)
                    .fromNow();
            } else if (fromNow) {
                return moment(children || getDate).fromNow();
            }
            if (showYear) {
                return moment(children || getDate).format("DD MMM YY");
            }
            return moment(children || getDate).format("DD MMM");
        }
        return t("error.date.invalid");
    };

    return (
        <span className={dateClasses}>
            {condition === true || condition === false ? (
                checkValidity() !== true && <Point color={checkValidity()} top={-5} left={-16} />
            ) : (
                <Fragment />
            )}
            <Text noWrap ligth={!bold} bold={!!bold} small={!!small} margin={!!margin} className={className}>
                {renderDate()}
            </Text>
        </span>
    );
};

export default withStyles(DateStyle)(CustomDate);
