const style = (theme) => ({
    root: {
        "& fieldset": {
            borderRadius: 6,
        },
        "& input + fieldset": {
            borderColor: "hsl(0,0%,80%)",
            borderWidth: 1,
        },
        "& input:hover + fieldset": {
            border: `1px solid ${theme.palette.grey[500]} !important`,
        },
        "& input:focus + fieldset": {
            border: `2px solid ${theme.palette.link.main} !important`,
        },
    },
    input: {
        padding: 9.5,
        borderRadius: 10,
    },
    textField: {
        background: theme.palette.background.paper,
        borderRadius: 10,
    },
    endAdornment: {
        minWidth: 24,
        display: "flex",
    },
    marginRight: {
        marginRight: 40,
    },
});

export default style;
