import {fontFamily} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        width: "100%",
    },
    error: {
        marginTop: "-6px",
    },
    option: {
        fontFamily,
        fontWeight: 300,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 6,
        minHeight: "32px !important",
        top: "40%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
        cursor: "pointer",
        "&:hover": {
            background: theme.palette.hover.select,
            borderRadius: 0,
        },
        "&:focus": {
            background: theme.palette.hover.select,
            borderRadius: 0,
        },
    },
    description: {
        fontSize: "0.8rem",
    },
});

export default style;
