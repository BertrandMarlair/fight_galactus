import React, {useState, Fragment, useEffect} from "react";
import moment from "moment";
import Style from "./InputStyle";
import {withStyles, useTheme} from "@material-ui/core";
import DayPicker, {DateUtils} from "react-day-picker";
import "react-day-picker/lib/style.css";
import Input from "./Input";
import Menu from "../menu/CustomMenu";
import Helmet from "react-helmet";

const InputDateDouble = ({range, onChange, placeholder, autoFocus, format, onClose, autoClose = true}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [focus, setFocus] = useState(false);
    const [innerRange, setInnerRange] = useState(range ? range : {from: undefined, to: undefined});
    const theme = useTheme();

    useEffect(() => {
        if (!focus) {
            setInnerRange(
                range
                    ? {from: range.from ? new Date(range.from) : null, to: range.to ? new Date(range.to) : null}
                    : {from: undefined, to: undefined},
            );
        }
        // eslint-disable-next-line
    }, [range]);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setFocus(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setFocus(false);
        onClose();
    };

    const handleChange = (newDueDate) => {
        const output = DateUtils.addDayToRange(newDueDate, {
            from: innerRange && innerRange.from,
            to: innerRange && innerRange.to,
        });

        setInnerRange(output);
        if (output && output.from && output.to) {
            onChange({
                from: moment(new Date(output.from)).format(format ? format : "YYYY-MM-DD hh:mm:ss"),
                to: moment(new Date(output.to)).format(format ? format : "YYYY-MM-DD hh:mm:ss"),
            });
            if (autoClose) {
                handleClose();
            }
        }
    };

    useEffect(() => {
        if (autoFocus) {
            const picker = document.querySelector("#DayPickerDouble");

            if (picker) {
                setAnchorEl(picker);
                setFocus(true);
            }
        }
    }, [autoFocus]);

    const modifiers = {start: innerRange.from, end: innerRange.to};

    return (
        <Fragment>
            <Input
                id="DayPickerDouble"
                placeholder={placeholder}
                value={
                    innerRange && innerRange.from && innerRange.to
                        ? `Selected from ${innerRange.from.toLocaleDateString()} to ${innerRange.to.toLocaleDateString()}`
                        : "Please select the first day."
                }
                onChange={(e) => handleOpen(e)}
                onClick={(e) => handleOpen(e)}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) || focus}
                onClose={() => handleClose()}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}>
                <DayPicker
                    className="Selectable"
                    selectedDays={[innerRange.from, {from: innerRange.from, to: innerRange.to}]}
                    onDayClick={handleChange}
                    numberOfMonths={2}
                    modifiers={modifiers}
                />
            </Menu>
            <Helmet>
                <style>
                    {`
                        .DayPicker-Day {
                            padding: 5px;
                        }
                    `}
                </style>
            </Helmet>
            <Helmet>
                <style>
                    {`
                        .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
                            background-color: ${theme.palette.background.default} !important;
                            border-radius: 100% !important;
                        }
                        .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                            background-color: ${theme.palette.background.default} !important;
                            color: #4a90e2;
                        }
                        .Selectable .DayPicker-Day {
                            border-radius: 0 !important;
                        }
                        .Selectable .DayPicker-Day--start {
                            border-top-left-radius: 50% !important;
                            border-bottom-left-radius: 50% !important;
                        }
                        .Selectable .DayPicker-Day--end {
                            border-top-right-radius: 50% !important;
                            border-bottom-right-radius: 50% !important;
                        }
                        .DayPicker-Day {
                            padding: 5px;
                        }
                    `}
                </style>
            </Helmet>
        </Fragment>
    );
};

export default withStyles(Style)(InputDateDouble);
