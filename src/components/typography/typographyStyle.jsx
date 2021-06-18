// ##############################
// // // Typography styles
// #############################

import {remXXS, strongWhiteBorder, remS, remL, sizeS, remXs, fontFamily, remXXl} from "../../core/style/constant";

const typographyStyle = (theme) => ({
    defaultFontStyle: {
        fontFamily,
        fontSize: "0.9rem",
        lineHeight: 1.5,
        color: theme.palette.text.primary,
    },
    defaultHeaderMargins: {
        marginTop: "20px",
        marginBottom: "10px",
    },
    title: {
        fontSize: remXXl,
        color: theme.palette.text.primary,
        fontWeight: 200,
        letterSpacing: 0.3,
    },
    smaller: {
        fontSize: remL,
    },
    quote: {
        padding: "10px 20px",
        margin: "0 0 20px",
        fontSize: remXXS,
        borderLeft: strongWhiteBorder,
    },
    quoteText: {
        margin: "0 0 10px",
        fontStyle: "italic",
    },
    quoteAuthor: {
        display: "block",
        fontSize: "80%",
        lineHeight: "1.42857143",
        color: theme.palette.text.secondary,
    },
    mutedText: {
        color: theme.palette.text.secondary,
    },
    primaryText: {
        color: theme.palette.primary.main,
    },
    normalText: {
        fontSize: remS,
        color: theme.palette.text.primary,
        lineHeight: "normal",
        fontWeight: 300,
        wordBreak: "break-word",
    },
    smallTitleText: {
        color: theme.palette.text.primary,
        fontSize: remS,
        fontWeight: 400,
        wordBreak: "break-word",
    },
    success: {
        color: theme.palette.success.main,
    },
    warning: {
        color: theme.palette.warning.main,
    },
    error: {
        color: theme.palette.error.main,
    },
    white: {
        color: theme.palette.white.main,
    },
    link: {
        color: theme.palette.link.main,
    },
    contrasted: {
        color: theme.palette.text.fixed,
    },
    small: {
        fontSize: remXs,
    },
    big: {
        fontSize: remL,
    },
    primary: {
        color: theme.palette.primary.main,
    },
    default: {
        color: theme.palette.text.primary,
    },
    center: {
        textAlign: "center",
    },
    bold: {
        fontWeight: 600,
    },
    normal: {
        fontWeight: 400,
    },
    light: {
        fontWeight: 300,
    },
    italic: {
        fontStyle: "italic",
    },
    caption: {
        color: theme.palette.text.secondary,
        fontSize: remXs,
        fontWeight: sizeS,
    },
    underline: {
        textDecoration: "underline",
    },
    ellipsis: {
        whiteSpace: "nowrap !important",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    hoverable: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    margin: {
        marginLeft: 5,
    },
    minWidth: {
        minWidth: 180,
    },
    preWrap: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    },
    noWrap: {
        wordBreak: "inherit",
    },
    centered: {
        textAlign: "center",
    },
});

export default typographyStyle;
