const style = () => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    titleWrapper: {
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        width: "100%",
        marginTop: 30,
    },
    title: {
        fontSize: "3rem",
    },
    card: {
        display: "flex",
        alignItems: "center",
    },
    smallTitle: {
        fontSize: "1.6rem",
        marginLeft: 20,
    },
    scanner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "70%",
    },
    img: {
        width: "60%",
        height: "auto",
    },
    modalWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        textAlign: "center",
    },
    points: {
        fontSize: "3rem",
    },
});

export default style;
