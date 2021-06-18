import {mediaQuerySizeSm, mediaQuerySizeXs} from "../../../core/style/constant";

const style = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 50,
    },
    img: {
        width: "50%",
        maxWidth: 250,
        paddingTop: 20,
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            width: 250,
        },
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: 200,
        },
    },
    lessPadding: {
        paddingTop: 40,
    },
};

export default style;
