import React from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/styles";
import Menu from "@material-ui/core/Menu";
import style from "./CustomMenuStyle";
import Icon from "../icon/Icon";

const CustomMenu = ({children, className, classes, open, onClose, anchorEl}) => {
    const menuClasses = classNames({
        [classes.menu]: true,
        [className]: className,
    });

    return (
        <Menu
            className={classes.root}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}>
            <div className={menuClasses}>
                <div className={classes.icon} onClick={onClose}>
                    <Icon size={16}>Close</Icon>
                </div>
                {children}
            </div>
        </Menu>
    );
};

export default withStyles(style)(CustomMenu);
