import {displayBetween, mediaQuerySizeXs} from "../../../core/style/constant";

const containerHeight = 650;

const style = (theme) => ({
    root: {
        margin: "auto",
        maxWidth: 1200,
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    card: {
        width: "100%",
        minHeight: 600,
        maxHeight: containerHeight,
        overflow: "hidden",
        ...displayBetween,
        padding: 0,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            padding: 10,
            margin: 0,
            flexDirection: "column",
            minHeight: "unset",
            maxHeight: "unset",
        },
    },
    cardItemLeft: {
        width: "55%",
        display: "flex",
        height: "-webkit-fill-available",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "100%",
            height: "auto",
        },
    },
    cardItemRight: {
        width: "45%",
        position: "relative",
        display: "flex",
        height: "-webkit-fill-available",
        borderBottom: `${containerHeight}px solid ${theme.palette.primary.main}`,
        borderLeft: "85px solid transparent",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "100%",
            height: "auto",
            borderBottom: "unset",
            borderLeft: "unset",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 8,
        },
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
        maxWidth: 400,
        height: containerHeight,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            height: "auto",
            marginTop: 30,
            marginBottom: 30,
        },
    },
    cardContentPass: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "auto",
        height: containerHeight,
        padding: 10,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            height: "auto",
            marginTop: 30,
            marginBottom: 30,
            position: "relative",
        },
        position: "absolute",
    },
    title: {
        marginBottom: 20,
    },
    description: {
        marginBottom: 50,
        textAlign: "center",
    },
    label: {
        margin: "5px 0",
    },
    inputEmail: {
        marginBottom: 30,
    },
    forgotButton: {
        flexDirection: "row-reverse",
        justifyContent: "end",
    },
    forgotContainer: {
        margin: "10px 0",
    },
    form: {
        width: "100%",
    },
    formFooter: {
        marginTop: 30,
        ...displayBetween,
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            flexDirection: "column",
        },
    },
    imageContainer: {
        textAlign: "center",
        margin: 10,
    },
    image: {
        width: 60,
    },
    formMfa: {
        padding: 20,
    },
    headerMfa: {
        textAlign: "center",
    },
    checkbox: {
        display: "flex",
        alignItems: "center",
    },
    mfaInfo: {
        display: "flex",
        alignItems: "center",
        margin: 20,
    },
    mfaInfoText: {
        marginLeft: 10,
    },
    cardMfa: {
        maxWidth: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    alreadyKey: {
        display: "flex",
        width: "100%",
        marginTop: 30,
    },
    sso: {
        marginTop: 22,
    },
    ssoIcon: {
        marginRight: 20,
    },
});

export default style;
