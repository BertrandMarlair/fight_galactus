import {
    fontFamily,
    displayBetweenEndResponsive,
    mediaQuerySizeSm,
    displayVerticalCenter,
} from "../../core/style/constant";

const style = (theme) => ({
    select: {
        width: "100%",
        padding: "0px 10px",
        display: "flex",
        alignItems: "center",
        maxWidth: "inherit",
        minWidth: 0,
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            flexDirection: "column",
        },
    },
    selectNoSaved: {
        width: "100%",
        padding: "0px 10px",
        maxWidth: "inherit",
    },
    selectLoading: {
        width: "100%",
        minWidth: 300,
        padding: "0px 10px",
        display: "flex",
    },
    filterContainer: {
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        width: "100%",
        maxWidth: "inherit",
        position: "relative",
        justifyContent: "center",
        minWidth: 0,
    },
    recentSearch: {
        width: 200,
        maxWidth: 200,
        minWidth: 200,
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            width: "100%",
            maxWidth: "100%",
            minWidth: "100%",
            margin: "5px 0px",
        },
    },
    avatars: {
        display: "flex",
        alignItems: "center",
    },
    tag: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        margin: 2,
    },
    tagText: {
        whiteSpace: "nowrap",
        fontSize: "85%",
        padding: 3,
        paddingLeft: 6,
    },
    avatarsContainer: {
        marginRight: 10,
        display: "flex",
        alignItems: "center",
    },
    input: {
        width: "100%",
    },
    saveButton: {
        background: theme.palette.background.paper,
        border: theme.palette.border.input,
        padding: 5,
        borderRadius: "0px 6px 6px 0px",
        borderTop: theme.palette.border.input,
        borderRight: theme.palette.border.input,
        borderBottom: theme.palette.border.input,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
            background: theme.palette.hover.select,
        },
    },
    saveContainer: {
        maxWidht: "100%",
        padding: 25,
    },
    saveButtonContainer: {
        ...displayBetweenEndResponsive,
    },
    text: {
        margin: 10,
    },
    inputSave: {
        margin: 10,
    },
    option: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 10px",
        cursor: "pointer",
        "&:hover": {
            background: theme.palette.hover.select,
        },
        "&:focus": {
            background: theme.palette.hover.select,
        },
        zIndex: 2,
    },
    optionTitle: {
        minWidth: 100,
    },
    optionLabel: {
        display: "flex",
        alignItems: "center",
    },
    optionLabelText: {
        minWidth: 200,
    },
    selectUser: {
        width: "100%",
    },
    formatCreateLabel: {
        ...displayVerticalCenter,
    },
    noMultiValuesOperator: {
        ...displayVerticalCenter,
    },
    customFilterTest: {
        ...displayVerticalCenter,
        padding: 3,
        fontSize: "85%",
        paddingLeft: 6,
        width: "100%",
        margin: 2,
        borderRadius: 3,
    },
});

export default style;

const selectStyle = (provided, theme) => ({
    ...provided,
    fontFamily,
    fontWeight: 300,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: 6,
    maxHeight: "32px !important",
    minHeight: "unset !important",
});

export const customStyles = (theme, noSaved) => ({
    container: (provided) => ({
        ...provided,
        width: "100%",
        minWidth: 0,
    }),
    option: (provided) => ({
        ...selectStyle(provided, theme),
        "&:hover": {
            background: theme.palette.hover.select,
            borderRadius: 0,
        },
    }),
    control: (provided) => ({
        ...selectStyle(provided, theme),
        borderColor: "#c4c4c4",
        borderRadius: noSaved ? 6 : 0,
        borderLeft: noSaved ? "1px solid #c4c4c4" : "none",
        borderRight: noSaved ? "1px solid #c4c4c4" : "none",
        display: "flex",
        flexWrap: "nowrap",
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            borderRadius: "6px 0 0 6px",
            borderLeft: "1px solid #c4c4c4",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: theme.palette.input.placeholder,
    }),
    noOptionsMessage: (provided) => ({
        ...selectStyle(provided, theme),
    }),
    valueContainer: (provided) => ({
        ...provided,
        display: "flex !important",
        flexWrap: "nowrap !important",
    }),
    multiValue: (provided) => ({
        ...provided,
        minWidth: "inherit",
        backgroundColor: theme.palette.background.default,
        boxShadow: "0 0 0px 1px #4065ec57",
        margin: "0px 2px",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: theme.palette.text.primary,
    }),
    input: (provided) => ({
        ...provided,
        minWidth: 100,
    }),
});

export const customStylesRecentSearch = (theme) => ({
    container: (provided) => ({
        ...provided,
        width: "100%",
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: "12px",
        fontWeight: 400,
        top: 15,
        color: theme.palette.text.primary,
    }),
    option: (provided) => ({
        ...selectStyle(provided, theme),
        "&:hover": {
            background: theme.palette.hover.select,
            borderRadius: 0,
        },
        whiteSpace: "nowrap",
    }),
    control: (provided) => ({
        ...selectStyle(provided, theme),
        borderColor: "#c4c4c4",
        borderRadius: "6px 0px 0px 6px",
        [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
            borderRadius: "6px",
        },
        display: "flex",
        flexWrap: "nowrap",
    }),
    placeholder: (provided) => ({
        ...provided,
        top: 15,
        color: theme.palette.input.placeholder,
    }),
    noOptionsMessage: (provided) => ({
        ...selectStyle(provided, theme),
    }),
    valueContainer: (provided) => ({
        ...provided,
        display: "flex !important",
        flexWrap: "nowrap !important",
    }),
    multiValue: (provided) => ({
        ...provided,
        minWidth: "unset",
        backgroundColor: theme.palette.background.default,
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: theme.palette.text.primary,
    }),
    menu: (provided) => ({
        ...provided,
        width: "unset",
    }),
    menuList: (provided) => ({
        ...provided,
        width: "fit-content",
    }),
});
