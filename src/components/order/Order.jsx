import React from "react";
import Select from "react-select";
import {fontFamily} from "../../core/style/constant";
import {withStyles, useTheme} from "@material-ui/styles";
import OrderStyle from "./OrderStyle";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import Icon from "../icon/Icon";
import {Helmet} from "react-helmet";

const CustomSelect = (props) => {
    const {
        classes,
        options,
        autoFocus,
        style,
        inputValue,
        placeholder,
        defaultValue,
        orderDirection,
        setOrderDirection,
        setOrderValue,
        orderValue,
        isLoading = false,
        isDisabled = false,
        isClearable = false,
        isSearchable = true,
        ...rest
    } = props;

    // Options content an array with value and label as object properties

    const theme = useTheme();
    const {t} = useTranslation();

    const orderStyle = (provided) => ({
        ...provided,
        fontFamily,
        fontWeight: 300,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 6,
        maxHeight: "32px !important",
        minHeight: "unset !important",
        // top: "40%",
        ...style,
    });

    const customStyles = {
        option: (provided) => ({
            ...orderStyle(provided),
            "&:hover": {
                background: theme.palette.hover.select,
                borderRadius: 0,
            },
        }),
        container: () => ({
            width: "100%",
            position: "relative",
            boxSizing: "border-box",
        }),
        control: (provided) => ({
            ...orderStyle(provided),
            border: "none",
            borderLeft: theme.palette.border.input,
            borderTop: theme.palette.border.input,
            borderBottom: theme.palette.border.input,
            borderRadius: "5px 0px 0px 5px",
        }),
        input: (provided) => ({
            ...provided,
            top: "40%",
        }),
        Input: (provided) => ({
            ...provided,
            top: "40%",
        }),
        placeholder: (provided) => ({
            ...provided,
            top: "40%",
            color: theme.palette.input.placeholder,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#565F5A",
            marginLeft: 2,
            marginRight: 2,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            fontSize: 12,
            fontWeight: 400,
            position: "absolute",
            top: 12,
        }),
        noOptionsMessage: (provided) => ({
            ...orderStyle(provided),
        }),
    };

    const changeDirection = () => {
        setOrderDirection((e) => (e === "DESC" ? "ASC" : "DESC"));
    };

    return (
        <div className={classes.root} data-test-id={rest["data-test-id"]}>
            <Select
                value={orderValue}
                order
                onChange={(e) => setOrderValue(e)}
                classNamePrefix="select"
                defaultValue={defaultValue}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                name="color"
                options={options.map((option) => ({
                    ...option,
                    label: t(option.label),
                }))}
                styles={customStyles}
                autoFocus={autoFocus}
                inputValue={inputValue}
                theme={(selectTheme) => ({
                    ...selectTheme,
                    colors: {
                        ...selectTheme.colors,
                        neutral0: theme.palette.background.paper,
                        neutral50: theme.palette.text.primary,
                    },
                })}
            />
            <div onClick={changeDirection} className={classes.directionButton}>
                <Icon>{orderDirection === "DESC" ? "SortAscendingOutlined" : "SortDescendingOutlined"}</Icon>
            </div>
            <Helmet>
                <style>
                    {`
                        .select__option.select__option--is-focused {
                            background: ${theme.palette.hover.select} !important;
                        }
                    `}
                </style>
            </Helmet>
        </div>
    );
};

CustomSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    autoFocus: PropTypes.bool,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
};

export default withStyles(OrderStyle)(CustomSelect);
