import {
    boxShadowLight,
    boxShadowLightWhite,
    borderLight,
    borderInput,
    borderReactionLight,
    borderMedium,
} from "../style/constant";
import {globalPalette} from "./globalPalette";
import {globalMui} from "./globalMui";
import {useSelector} from "react-redux";
import {lightenColor} from "../utils/misc";

const useCustomTheme = () => {
    const theme = useSelector((state) => state.theme);

    const themeSettings = {
        palette: {
            common: {
                black: "rgba(0, 0, 0, 1)",
                white: "#ffffff",
                light: "#F5F7FB",
            },
            primary: {
                light: theme.primaryLightColor,
                main: "#ffffff",
                dark: theme.primaryDarkColor,
                mainContrast: theme.primaryColor,
                contrastText: "#ffffff",
                loaderColor: theme.primaryColor,
            },
            secondary: {
                light: "rgba(111, 235, 179, 1)",
                main: "rgba(57, 190, 131, 1)",
                dark: "rgba(24, 155, 97, 1)",
                contrastText: "#ffffff",
            },
            text: {
                primary: "#ffffff",
                secondary: "#7A7A7A",
                light: "#C4C4C4",
                focus: "#dcdcdc",
                disabled: "rgba(86, 95, 90, 0.51)",
                title: "#000000",
                hint: "rgba(0, 0, 0, 0.38)",
                colored: theme.primaryColor,
                coloredLight: lightenColor(theme.primaryColor, 20),
                fixed: "#565F5A",
                contrasted: "#000000",
            },
            background: {
                paper: "#292845",
                default: "#1e1d32",
                light: "#f0f0f1",
                grey: "#F7F7F7",
                reaction: "#e4efff",
                card: "#ffffff",
            },
            boxShadow: {
                main: boxShadowLight,
                white: boxShadowLightWhite,
            },
            border: {
                main: borderLight,
                input: borderInput,
                colored: borderLight,
                reaction: borderReactionLight,
                medium: borderMedium,
            },
            input: {
                placeholder: "#c8cbca",
            },
            hover: {
                select: "#edf3f9",
            },
            ...globalPalette,
        },
        ...globalMui,
    };

    return {themeSettings};
};

export default useCustomTheme;
