import React from "react";
import {Helmet} from "react-helmet";
import {useTheme} from "@material-ui/core";
import {useSelector} from "react-redux";
import {heightAppBar} from "./constant";

const Style = () => {
    const layout = useSelector((state) => state.darkMode);
    const theme = useTheme();
    const {zoom} = useSelector((state) => state.theme);

    return (
        <Helmet>
            {layout && layout.isDarkMode && (
                <style>
                    {`
                        .MuiCheckbox-colorPrimary.Mui-checked {
                            color: ${theme.palette.link.main} !important;
                        }
                        ul, li {
                            color: ${theme.palette.text.primary};
                        }
                    `}
                </style>
            )}
            <style>
                {`
                    html, body, #root {
                        height: calc(100% - ${heightAppBar}px);
                    }
                    ul, li {
                            color: ${theme.palette.text.primary};
                    }
                    .react-select__option.react-select__option--is-focused {
                        background: ${theme.palette.hover.select} !important;
                    }

                    html {
                        zoom: ${zoom};
                    }
                    
                    #hubspot-messages-iframe-container.widget-align-right {
                        transform: scale(${zoom});
                        transform-origin: bottom right;
                        zoom: 1.3;
                    }
                `}
            </style>
        </Helmet>
    );
};

export default Style;
