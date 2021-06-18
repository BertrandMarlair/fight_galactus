import React, {Suspense} from "react";

import {MuiThemeProvider} from "@material-ui/core/styles";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {createMuiTheme} from "@material-ui/core/styles";
import {SnackbarProvider} from "notistack";

import useCustomTheme from "../core/theme/theme";
import {MAX_SNACK} from "../core/constants";
import Style from "../core/style/style";

import {StylesProvider} from "@material-ui/core/styles";
import {create} from "jss";
import {createGenerateClassName, jssPreset} from "@material-ui/core/styles";
import LoaderLayout from "../components/loading/LoaderLayout";

const MuiProvider = ({children}) => {
    const {themeSettings} = useCustomTheme();

    const createTheme = createMuiTheme(themeSettings);

    const generateClassName = createGenerateClassName({
        productionPrefix: `c${
            Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4)
        }-`,
    });
    const jss = create({
        ...jssPreset(),
    });

    return (
        <MuiThemeProvider theme={createTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <StylesProvider generateClassName={generateClassName} jss={jss}>
                    <Suspense fallback={<LoaderLayout />}>
                        <SnackbarProvider maxSnack={MAX_SNACK}>{children}</SnackbarProvider>
                    </Suspense>
                    <Style />
                </StylesProvider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
};

export default MuiProvider;
