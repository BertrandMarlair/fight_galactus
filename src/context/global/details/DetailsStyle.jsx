import {borderLight} from "../../../core/style/constant";

const style = () => ({
    root: {
        width: "100%",
    },
    container: {
        paddingBottom: 60,
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
    card: {},
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerinfo: {
        display: "flex",
        alignItems: "center",
    },
    smallTitle: {
        fontSize: "1.6rem",
        marginLeft: 20,
    },
    possession: {
        marginTop: 10,
        borderTop: borderLight,
    },
    possessionWrapper: {
        paddingLeft: 10,
        display: "flex",
        alignItems: "center",
    },
    input: {
        padding: 20,
    },
});

export default style;
