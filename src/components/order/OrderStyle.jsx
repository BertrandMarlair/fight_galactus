import {mediaQuerySizeSm} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        width: "250px",
        display: "flex",
        alignItems: "center",
        marginRight: 10,
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            width: "100%",
            padding: "0px 10px",
            margin: "5px 0px",
        },
    },
    directionButton: {
        background: theme.palette.background.paper,
        border: theme.palette.border.input,
        padding: 5,
        borderRadius: "0px 5px 5px 0px",
        borderTop: theme.palette.border.input,
        borderRight: theme.palette.border.input,
        borderBottom: theme.palette.border.input,
        cursor: "pointer",
        "&:hover": {
            background: theme.palette.hover.select,
        },
    },
});

export default style;
