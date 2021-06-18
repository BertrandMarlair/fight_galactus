import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./CardStyle";
import classNames from "classnames";
import PropTypes from "prop-types";

const Card = ({
    classes,
    className,
    children,
    noPadding,
    noMargin,
    onClick,
    width,
    vignette,
    noShadow,
    widget,
    style: customStyle,
}) => {
    const cardClasses = classNames({
        [classes.root]: true,
        [className]: className,
        [classes.noMargin]: noMargin,
        [classes.noPadding]: noPadding,
        [classes.vignette]: vignette,
        [classes.widget]: widget,
        [classes.noShadow]: noShadow,
    });

    return (
        <div className={cardClasses} style={{width, ...customStyle}} onClick={onClick}>
            {children}
        </div>
    );
};

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    noPadding: PropTypes.bool,
    noShadow: PropTypes.bool,
    noMargin: PropTypes.bool,
    width: PropTypes.number,
    vignette: PropTypes.bool,
    widget: PropTypes.bool,
    style: PropTypes.object,
};

export default withStyles(style)(Card);
