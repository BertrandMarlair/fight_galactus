import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core";
import SearchStyle from "../SearchStyle";
import Title from "../../typography/Title";
import Modal from "../../modal/SimpleModal";
import Text from "../../typography/Text";
import Button from "../../button/Button";
import Input from "../../input/Input";
import Select from "../../select/Select";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/react-hooks";
import Error from "../../error/Error";
import gql from "graphql-tag";
import {EventEmitter} from "../../../core/events/events";
import {ADD_FITLER_EVENT} from "../../../core/constants";
import {useLocation} from "react-router-dom";

const AddFilter = ({openSaveFilter, setOpenSaveFilter, classes, selected}) => {
    const location = useLocation();
    const {t} = useTranslation();

    const options = [
        {
            value: "local",
            label: t("filter.saved.local"),
        },
        {
            value: "global",
            label: t("filter.saved.global"),
        },
    ];

    const [filterName, setFilterName] = useState("");
    const [filterNameError, setFilterNameError] = useState(null);
    const [filterType, setFilterType] = useState(options[0]);
    const [filterTypeError, setFilterTypeError] = useState(null);
    const [selectedError, setSelectedError] = useState(null);
    const [errors, setErrors] = useState(null);

    const [addSearchFilter, {data, error, loading}] = useMutation(ADD_SEARCH_FILTER);

    const saveFilter = () => {
        let validation = true;

        if (selected && selected.length > 0) {
            setSelectedError(null);
        } else {
            setSelectedError("filter.error.selected");
            validation = false;
        }
        if (filterName && filterName.length > 0) {
            setFilterNameError(null);
        } else {
            setFilterNameError("filter.error.name");
            validation = false;
        }
        if (filterType && filterType.value && filterType.value.length > 0) {
            setFilterTypeError(null);
        } else {
            setFilterTypeError("filter.error.type");
            validation = false;
        }

        if (validation) {
            addSearchFilter({
                variables: {
                    filter: {
                        title: filterName,
                        type: filterType.value,
                        path: location.pathname,
                        filter: selected,
                    },
                },
            });
        }
    };

    useEffect(() => {
        if (data) {
            if (data.addSearchFilter && data.addSearchFilter.id) {
                setOpenSaveFilter(false);
                EventEmitter.dispatch(ADD_FITLER_EVENT, data.addSearchFilter);
            } else {
                setErrors("filter.error.add");
            }
        }
    }, [data, setOpenSaveFilter, setErrors]);

    return (
        <Modal open={openSaveFilter} onClose={() => setOpenSaveFilter(false)}>
            <div className={classes.saveContainer}>
                <Title small>{t("filter.saved.title")}</Title>
                <Text className={classes.text}>{t("filter.saved.description")}</Text>
                <div className={classes.inputSave}>
                    <Input
                        onChange={(e) => setFilterName(e.target.value)}
                        placeholder={t("filter.saved.placeholderFilterName")}
                        helperText={t(filterNameError)}
                        error={!!filterNameError}
                    />
                </div>
                <div className={classes.inputSave}>
                    <Select
                        placeholder={t("filter.saved.placeholderSaveType")}
                        onChange={(e) => setFilterType(e)}
                        options={options}
                        error={filterTypeError}
                        defaultValue={filterType}
                    />
                </div>
                <Error errorMessage={error || errors} />
                <Error errorMessage={selectedError} />
                <div className={classes.saveButtonContainer}>
                    <Button color="white" onClick={() => setOpenSaveFilter(false)}>
                        {t("filter.saved.cancel")}
                    </Button>
                    <Button loading={loading} onClick={() => saveFilter()}>
                        {t("filter.saved.save")}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default withStyles(SearchStyle)(AddFilter);

const ADD_SEARCH_FILTER = gql`
    mutation addSearchFilter($filter: addSearchFilterInput) {
        addSearchFilter(filter: $filter) {
            id
            type
            title
            filter
        }
    }
`;
