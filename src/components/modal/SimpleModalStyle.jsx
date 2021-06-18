const style = (theme) => ({
    paper: {
        boxShadow: theme.palette.boxShadow.main,
        background: theme.palette.background.paper,
        padding: 0,
        outline: "none",
        borderRadius: 8,
        height: "100%",
        display: "flex",
        maxHeight: "90vh",
        overflowY: "overlay",
    },
    iconButton: {
        position: "absolute",
        zIndex: "4",
        right: "5px",
        top: "5px",
    },
    maxWidth: {
        maxWidth: 0,
    },
    noScroll: {
        overflow: "initial !important",
    },
});

export default style;
