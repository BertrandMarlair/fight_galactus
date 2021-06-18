import {mediaQuerySizeSm, heightAppBar} from "../../core/style/constant";

const style = () => ({
    root: {
        width: "100%",
        display: "flex",
        padding: 3,
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            flexDirection: "column",
        },
    },
    rootMulti: {
        width: "100%",
        display: "flex",
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            flexDirection: "column",
        },
    },
    tab: {
        position: "sticky",
        top: heightAppBar,
        zIndex: 1,
    },
    badge: {
        width: "100%",
    },
});

export default style;
