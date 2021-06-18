import React, {useState, Fragment, useEffect} from "react";
import moment from "moment";
import Style from "./InputStyle";
import {withStyles, useTheme} from "@material-ui/core";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import Input from "./Input";
import Menu from "../menu/CustomMenu";
import Helmet from "react-helmet";
import {useSelector} from "react-redux";

const InputDate = ({value, onChange, placeholder, autoFocus, format, onClose}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [focus, setFocus] = useState(false);

    const theme = useTheme();
    const layout = useSelector((state) => state.darkMode);
    const {isDarkMode} = layout;

    const handleOpen = (e) => {
        if (focus) {
            setFocus(false);
        } else {
            setAnchorEl(e.currentTarget);
            setFocus(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        onClose && onClose();
    };

    const handleChange = (newDueDate) => {
        let output = moment(newDueDate, "YYYY-MM-DD").format(format ? format : "YYYY-MM-DD hh:mm:ss");

        onChange(output);
        handleClose();
    };

    useEffect(() => {
        if (focus) {
            const DayToday = document.querySelector(".DayPicker-Day--today");

            if (DayToday) {
                DayToday.focus();
            }
        }
    }, [focus]);

    useEffect(() => {
        if (autoFocus) {
            const picker = document.querySelector("#DayPicker");

            if (picker) {
                setAnchorEl(picker);
            }
        }
    }, [autoFocus]);

    return (
        <Fragment>
            <Input
                id="DayPicker"
                placeholder={placeholder}
                value={value ? moment(value).format("YYYY-MM-DD") : ""}
                onClick={(e) => handleOpen(e)}
                onFocus={(e) => handleOpen(e)}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()} elevation={0}>
                <DayPicker
                    selectedDays={value ? new Date(moment(value, "YYYY-MM-DD").format("YYYYMMDD")) : null}
                    onDayClick={handleChange}
                    showOutsideDays
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
            {isDarkMode && (
                <Helmet>
                    <style>
                        {`
                            .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
                                background-color: ${theme.palette.background.default};
                            }
                            .DayPicker-Day {
                                padding: 5px;
                            }
                        `}
                    </style>
                </Helmet>
            )}
        </Fragment>
    );
};

export default withStyles(Style)(InputDate);
