const style = (theme) => ({
    badge: {
        display: "inline-block",
        color: theme.palette.common.white,
        padding: "1px 10px",
        borderRadius: 10,
        fontSize: 12,
        height: 16,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
    },
    marginLeft: {
        marginLeft: 10,
    },
    small: {
        fontSize: 10,
        padding: "1px 6px",
    },
    "bottom-end": {
        position: "relative",
        top: "8px",
        left: "8px",
    },
    "bottom-start": {
        position: "relative",
        top: "-8px",
        left: "8px",
    },
    bottom: {
        position: "relative",
        top: "8px",
    },
    "top-end": {
        position: "relative",
        top: "-8px",
        left: "-8px",
    },
    "top-start": {
        position: "relative",
        top: "-8px",
        left: "-8px",
    },
    top: {
        position: "relative",
        top: "-8px",
    },
});

export default style;
