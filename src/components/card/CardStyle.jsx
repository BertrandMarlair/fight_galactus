import {borderLeft} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        boxShadow: theme.palette.boxShadow.main,
        background: theme.palette.background.paper,
        margin: 16,
        padding: 16,
        borderRadius: 8,
    },
    noPadding: {
        padding: 0,
    },
    noMargin: {
        margin: 0,
        marginTop: 10,
    },
    widget: {
        margin: 0,
        marginTop: 0,
        boxShadow: "unset",
    },
    noShadow: {
        boxShadow: "unset",
    },
    vignette: {
        padding: "13px 10px 13px 15px",
        borderLeft: borderLeft,
        minWidth: 200,
    },
});

export default style;
