import {borderLight, remS} from "../style/constant";

export const globalMui = {
    overrides: {
        MuiInputBase: {
            input: {
                fontFamily: "Lato",
                fontWeight: 300,
                padding: "6.5px 15px !important",
            },
        },
        MuiOutlinedInput: {
            input: {
                fontFamily: "Lato",
                fontWeight: 300,
            },
            multiline: {
                padding: 0,
                minHeight: 100,
                display: "flex",
                alignItems: "flex-start",
                paddingTop: 7,
            },
        },
        MuiMenu: {
            list: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
        MuiPaper: {
            elevation8: {
                boxShadow: "0px 12px 28px rgba(0, 9, 128, 0.1)",
            },
        },
        MuiTableCell: {
            root: {
                borderStyle: "none !important",
            },
        },
        MuiMenuItem: {
            root: {
                minHeight: 0,
            },
        },
        MuiTableRow: {
            root: {
                borderBottom: borderLight,
            },
        },
        MuiTableSortLabel: {
            root: {
                whiteSpace: "nowrap",
            },
        },
        MuiTabs: {
            root: {
                width: "100%",
            },
        },
        MuiAccordionSummary: {
            root: {
                padding: 0,
                borderBottom: "none !important",
                width: "100%",
            },
            content: {
                margin: "0px !important",
            },
        },
        MuiAccordion: {
            root: {
                "&:before": {
                    content: "none",
                },
            },
        },
        MuiAccordionDetails: {
            root: {
                padding: "8px 0px",
            },
        },
        MuiListItemIcon: {
            root: {
                minWidth: 50,
            },
        },
        MuiSnackbarContent: {
            root: {
                color: "white",
            },
        },
        MuiDialog: {
            paper: {
                overflowY: "initial",
            },
            paperFullScreen: {
                overflow: "auto",
            },
            paperWidthLg: {
                maxWidth: "99vw",
            },
        },
        MuiTypography: {
            body1: {
                fontSize: remS,
                lineHeight: "normal",
                fontWeight: 300,
                fontFamily: "Lato",
                letterSpacing: 0,
            },
        },
    },
};
