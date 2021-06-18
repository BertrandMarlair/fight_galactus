const style = (theme) => ({
    root: {
        zIndex: "1300 !important",
    },
    menu: {
        paddingTop: 10,
        boxShadow: theme.palette.boxShadow.main,
        background: theme.palette.background.paper,
    },
    icon: {
        display: "flex",
        justifyContent: "flex-end",
        cursor: "pointer",
        marginRight: 10,
    },
});

export default style;
