import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./PopperStyle";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import PropTypes from "prop-types";
import Card from "../card/Card";

const CustomPopper = ({children, anchorEl, handleClose, width, classes}) => {
    return (
        <Popper open={!!anchorEl} anchorEl={anchorEl} transition disablePortal style={{zIndex: 1}}>
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        zIndex: 1,
                    }}>
                    <Card noMargin noPadding width={width} className={classes.root}>
                        <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
                    </Card>
                </Grow>
            )}
        </Popper>
    );
};

CustomPopper.propTypes = {
    classes: PropTypes.object.isRequired,
    anchorRef: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default withStyles(style)(CustomPopper);
