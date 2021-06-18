/* eslint-disable no-nested-ternary */
import React, {Fragment} from "react";
import {css} from "glamor";
import {withStyles} from "@material-ui/styles";
import IconStyle from "./IconStyle";
import listIcon from "./list";
import ReactSVG from "react-svg";
import classNames from "classnames";
import {Tooltip, useTheme} from "@material-ui/core";

const GetIcon = ({
    classes,
    children,
    size,
    color,
    className,
    style,
    background,
    radius,
    hover,
    boxShadow,
    transition,
    pointer,
    overflow,
    margin,
    seo,
    marginRight,
    border,
    light,
    onClick,
    inheritCursor,
    tooltipTitle,
}) => {
    const theme = useTheme();

    const styles = css({
        " svg": {
            height: size ? size : 20,
            width: size ? size : 20,
            fill: color ? color : theme.palette.text.primary,
            background: background ? background : "unset",
            "&:hover": {
                fill: hover ? theme.palette.link.main : color ? color : theme.palette.link.main,
            },
        },
        " div": {
            display: "flex",
            alignItems: "center",
            margin,
        },
    });

    const getIconUrl = () => {
        const icon = listIcon.find((i) => i.name === children);

        if (icon) {
            return icon.url;
        }
        return `${process.env.PUBLIC_URL}/assets/icons/materialIcon/baseline-sync_disabled-24px.svg`;
    };

    const iconClasses = classNames({
        [className]: className,
        [classes.boxShadow]: boxShadow,
        [classes.loading]: children === "Loading",
        [classes.pointer]: pointer,
        [classes.transition]: transition,
        [classes.hover]: hover,
        [classes.hoverIcon]: hover,
        [classes.radius]: radius,
        [classes.overflow]: overflow,
        [classes.marginRight]: marginRight,
        [classes.light]: light,
        [classes.border]: border,
        [classes.inheritCursor]: inheritCursor,
    });

    return (
        <Fragment>
            {seo && <div className={classes.seo}>Seo title name</div>}
            <div className={iconClasses} style={style} onClick={onClick && onClick}>
                <Tooltip title={tooltipTitle ?? ""}>
                    <ReactSVG src={getIconUrl()} className="iconSvg" {...styles} style={{...styles.svg}} />
                </Tooltip>
            </div>
        </Fragment>
    );
};

export default withStyles(IconStyle)(GetIcon);
