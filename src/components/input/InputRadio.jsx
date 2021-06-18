import React from "react";
import PropTypes from "prop-types";
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import Style from "./InputStyle";

const InputRadio = (props) => {
    const {children, content, selectedValue, handleChange} = props;

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{children}</FormLabel>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                {content.map((e) => (
                    <Tooltip key={`tooltip/${e.value}`} title={e.tooltipTitle}>
                        <FormControlLabel
                            key={`formLabel/${e.value}`}
                            value={e.value}
                            control={
                                <Radio
                                    onChange={() => handleChange(e.value)}
                                    checked={selectedValue === e.value}
                                    key={`radio/${e.value}`}
                                />
                            }
                            label={e.title}
                            labelPlacement="start"
                        />
                    </Tooltip>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

InputRadio.propTypes = {
    content: PropTypes.array,
    children: PropTypes.node,
    selectedValue: PropTypes.string,
    handleChange: PropTypes.func,
};
export default withStyles(Style)(InputRadio);
