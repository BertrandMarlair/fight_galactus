/* eslint-disable no-shadow */
import React from "react";
import Select from "react-select";
import {fontFamily} from "../../core/style/constant";
import {withStyles, useTheme} from "@material-ui/styles";
import SelectStyle from "./SelectStyle";
import PropTypes from "prop-types";
import Error from "../error/Error";

const CustomSelect = (props) => {
    const {
        classes,
        options,
        autoFocus,
        menuIsOpen,
        onChange,
        style,
        inputValue,
        placeholder,
        defaultValue,
        classNamePrefix,
        minWidth,
        isMulti,
        error,
        isDisabled = false,
        isLoading = false,
        isClearable = true,
        value,
        menuMaxHeight,
        backgroundColor,
        ...rest
    } = props;

    const isSearchable = true;

    const theme = useTheme();

    const selectStyle = (provided) => ({
        ...provided,
        fontFamily,
        fontWeight: 300,
        color: theme.palette.text.primary,
        borderRadius: 6,
        maxHeight: "32px !important",
        minHeight: "unset !important",
        top: "40%",
        ...style,
    });

    const customStyles = {
        option: (provided) => ({
            ...selectStyle(provided),
            // background: theme.palette.background.paper,
            "&:hover": {
                background: theme.palette.hover.select,
                borderRadius: 0,
            },
            "&:focus": {
                background: theme.palette.hover.select,
                borderRadius: 0,
            },
        }),
        control: (provided) => ({
            ...selectStyle(provided),
            borderColor: error ? "red" : "#c4c4c4",
            overflow: "hidden",
        }),
        input: (provided) => ({
            ...provided,
            top: "40%",
            overflow: "hidden !important",
        }),
        Input: (provided) => ({
            ...provided,
            top: "40%",
            overflow: "hidden !important",
        }),
        placeholder: (provided) => ({
            ...provided,
            top: "40%",
            color: theme.palette.input.placeholder,
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme.palette.text.primary,
            top: "40%",
        }),
        noOptionsMessage: (provided) => ({
            ...selectStyle(provided),
        }),
        menuList: (provided) => ({
            ...provided,
            maxHeight: menuMaxHeight ?? 300,
        }),
    };

    const OptionLayout = (props) => {
        const {innerProps, innerRef, isFocused} = props;

        return (
            <div
                ref={innerRef}
                {...innerProps}
                style={{background: isFocused ? theme.palette.hover.select : "inherit"}}
                className={classes.option}>
                <div>{props.data.label}</div>
                <div className={classes.description}>{props.data.description}</div>
            </div>
        );
    };

    return (
        <div className={classes.root} data-test-id={rest["data-test-id"]} style={{minWidth: minWidth ? 200 : 0}}>
            <Select
                order
                onChange={onChange}
                classNamePrefix={classNamePrefix}
                defaultValue={defaultValue}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                menuIsOpen={menuIsOpen}
                name="color"
                options={options}
                styles={customStyles}
                autoFocus={autoFocus}
                inputValue={inputValue}
                value={value}
                isMulti={isMulti}
                theme={(selectTheme) => ({
                    ...selectTheme,
                    colors: {
                        ...selectTheme.colors,
                        neutral0: backgroundColor ? backgroundColor : theme.palette.background.paper,
                        neutral50: theme.palette.text.primary,
                    },
                })}
                components={{Option: OptionLayout}}
                className={classes.select}
            />
            {error && (
                <div className={classes.error}>
                    <Error errorMessage={error} />
                </div>
            )}
        </div>
    );
};

CustomSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    autoFocus: PropTypes.bool,
    isClearable: PropTypes.bool,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    menuIsOpen: PropTypes.string,
    classNamePrefix: PropTypes.string,
};

export default withStyles(SelectStyle)(CustomSelect);
