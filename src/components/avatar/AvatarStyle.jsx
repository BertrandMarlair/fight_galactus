const avatarStyle = (theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        margin: 5,
    },
    fullWidth: {
        width: "100%",
    },
    noMargin: {
        margin: "0",
        marginTop: "0 !important",
    },
    centered: {
        margin: "auto",
        display: "block",
    },
    whiteBorder: {
        border: `solid 2px ${theme.palette.background.paper}`,
    },
    bigger: {
        width: 100,
        height: 100,
    },
    big: {
        width: 60,
        height: 60,
        fontSize: 25,
    },
    small: {
        width: 30,
        height: 30,
        fontWeight: 300,
        fontSize: "1rem",
    },
    smaller: {
        width: 22,
        height: 22,
        fontSize: "0.8rem",
    },
    negMargin: {
        marginRight: "-10px !important",
    },
    menu: {
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
    },
});

export default avatarStyle;
