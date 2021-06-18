const StyleIcon = (theme) => ({
    boxShadow: {
        boxShadow: `0 0 7px ${theme.palette.primary.main}`,
    },
    pointer: {
        cursor: "pointer",
    },
    transition: {
        transition: "0.1s",
    },
    hover: {
        cursor: "pointer",
        transition: "0.2s",
        padding: 2,
        "&:hover": {
            transform: "scale(1.1)",
            background: theme.palette.hover.select,
        },
    },
    radius: {
        borderRadius: "100%",
    },
    overflow: {
        overflow: "hidden",
    },
    seo: {
        opacity: "0",
        height: 0,
        width: 0,
    },
    marginRight: {
        marginRight: 7,
    },
    light: {
        color: theme.palette.input.placeholder,
    },
    border: {
        border: theme.palette.border.main,
        padding: 3,
        borderRadius: "100%",
    },
    loading: {
        animation: "$loadingAnimation 1s linear infinite",
    },
    "@keyframes loadingAnimation": {
        from: {transform: "rotate(0deg)"},
        to: {transform: "rotate(360deg)"},
    },
    inheritCursor: {
        cursor: "inherit",
    },
});

export default StyleIcon;
