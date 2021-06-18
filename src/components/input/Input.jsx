import React from "react";
import PropTypes from "prop-types";
import {FormControl, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Style from "./InputStyle";

const Input = (props) => {
    const {
        classes,
        onChange,
        value,
        endAdornment,
        placeholder,
        disabled,
        helperText,
        autoComplete,
        type,
        error,
        marginRight,
        minWidth,
        multiline,
        rows,
        autoFocus,
        ...rest
    } = props;

    return (
        <FormControl
            className={classes.root}
            fullWidth
            variant="outlined"
            style={{
                marginRight: marginRight ? 40 : 0,
                minWidth: minWidth ? 230 : 0,
            }}>
            <TextField
                variant="outlined"
                inputProps={{
                    style: {padding: "9.5px 15px", fontWeight: 300},
                    ...rest,
                }}
                InputProps={{
                    endAdornment: endAdornment ? <div className={classes.endAdornment}>{endAdornment}</div> : null,
                    className: classes.textField,
                }}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                type={type}
                helperText={helperText}
                error={error}
                multiline={multiline}
                rows={rows}
                autoFocus={autoFocus}
            />
        </FormControl>
    );
};

Input.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    helperText: PropTypes.string,
    type: PropTypes.string,
    minWidth: PropTypes.bool,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    marginRight: PropTypes.bool,
};

export default withStyles(Style)(Input);
