import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import avatarStyle from "./AvatarStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import {NO_AVATAR_URL, PUBLIC_URL} from "../../core/constants";
import {stringToColour} from "../../core/utils/misc";
import {useTheme} from "@material-ui/core";

const RegularAvatar = ({...props}) => {
    const {
        classes,
        className,
        centered,
        whiteBorder,
        noMargin,
        disableTooltip = false,
        placement = "top",
        size,
        avatar,
        name,
        negMargin,
        menu,
        ...rest
    } = props;

    const theme = useTheme();

    const containerClasses = classNames({
        [classes.container]: true,
        [classes.noMargin]: noMargin,
        [classes.negMargin]: negMargin,
        [classes.menu]: menu,
    });

    const avatarClasses = classNames({
        [className]: className,
        [classes.noMargin]: noMargin,
        [classes.centered]: centered,
        [classes[size]]: size,
        [classes.whiteBorder]: whiteBorder,
    });

    const tooltipClasses = classNames({
        [className]: className,
    });

    const getAvatar = () => {
        if (avatar) {
            return <Avatar alt="custom avatar" {...rest} className={avatarClasses} src={avatar} />;
        } else if (name) {
            const stringColor = stringToColour(name);
            const backgroundColor = `hsl(${stringColor}, 63%, 50%)`;
            const color = theme.palette.white.main;

            return (
                <Avatar alt="custom avatar" {...rest} className={avatarClasses} style={{backgroundColor, color}}>
                    {name[0].toUpperCase()}
                </Avatar>
            );
        }

        return <Avatar alt="custom avatar" {...rest} className={avatarClasses} src={`${PUBLIC_URL}${NO_AVATAR_URL}`} />;
    };

    const getTitle = () => {
        if (name) {
            return name;
        }

        return null;
    };

    const title = getTitle();

    return !disableTooltip && title ? (
        <Tooltip className={tooltipClasses} title={title} placement={placement}>
            <div className={containerClasses}>{getAvatar()}</div>
        </Tooltip>
    ) : (
        <div className={containerClasses}>{getAvatar()}</div>
    );
};

RegularAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object,
    avatar: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    centered: PropTypes.string,
    new: PropTypes.bool,
    placement: PropTypes.oneOf([
        "bottom-end",
        "bottom-start",
        "bottom",
        "left-end",
        "left-start",
        "left",
        "right-end",
        "right-start",
        "right",
        "top-end",
        "top-start",
        "top",
    ]),
    size: PropTypes.oneOf(["bigger", "big", "small", "smaller"]),
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    disableTooltip: PropTypes.bool,
    whiteBorder: PropTypes.bool,
    negMargin: PropTypes.bool,
    noMargin: PropTypes.bool,
    disableLink: PropTypes.bool,
    menu: PropTypes.bool,
};

export default withStyles(avatarStyle)(RegularAvatar);
