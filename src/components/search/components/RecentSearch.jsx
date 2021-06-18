import React, {useState, useEffect, Fragment} from "react";
import {withStyles} from "@material-ui/core";
import SearchStyle, {customStylesRecentSearch} from "../SearchStyle";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import {useQuery, useMutation} from "@apollo/react-hooks";
import Error from "../../error/Error";
import gql from "graphql-tag";
import {useTheme} from "@material-ui/styles";
import Icon from "../../icon/Icon";
import Text from "../../typography/Text";
import SmallTitle from "../../typography/SmallTitle";
import {EventEmitter} from "../../../core/events/events";
import {ADD_FITLER_EVENT} from "../../../core/constants";
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";

const RecentSearch = ({classes, setSelected}) => {
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const {t} = useTranslation();
    const theme = useTheme();

    const {data, loading, error} = useQuery(GET_SEARCH_FILTER_BU_USER, {
        variables: {
            path: location.pathname,
        },
        notifyOnNetworkStatusChange: true,
    });

    const [deleteSearchFilter, {data: dataDelete, error: errorDelete, loading: loadingDelete}] = useMutation(
        DELETE_SEARCH_FILTER_BU_USER,
    );

    useEffect(() => {
        EventEmitter.subscribe(ADD_FITLER_EVENT, (newOption) => {
            const option = {
                id: newOption.id,
                value: newOption.filter,
                label: newOption.title,
            };

            setOptions((e) => [...e, option]);
        });
    }, [setOptions]);

    useEffect(() => {
        if (data) {
            if (data.getSearchFiltersByUser && data.getSearchFiltersByUser.length > 0) {
                let currentOptions = [];

                for (let currentOption of data.getSearchFiltersByUser) {
                    currentOptions.push({
                        id: currentOption.id,
                        value: currentOption.filter,
                        label: currentOption.title,
                    });
                }
                setOptions(currentOptions);
            }
        }
    }, [data]);

    useEffect(() => {
        if (dataDelete) {
            if (dataDelete.deleteSearchFilter && dataDelete.deleteSearchFilter.id) {
                const deletedIndex = options.findIndex(
                    (option) => parseInt(option.id) === dataDelete.deleteSearchFilter.id,
                );

                if (deletedIndex >= 0) {
                    const newOption = [
                        ...options.slice(0, deletedIndex),
                        ...options.slice(deletedIndex + 1, options.length),
                    ];

                    setOptions(newOption);
                }
            }
        }
    }, [dataDelete, options]);

    const addFilter = (option) => {
        setSelected(option.value);
    };

    const deleteFilter = (optionId) => {
        deleteSearchFilter({
            variables: {
                id: optionId,
            },
        });
    };

    const Option = (props) => {
        const {children, data: optionData, innerRef, innerProps, isFocused} = props;

        let label = "";

        if (optionData.value && optionData.value[0] && optionData.value[0].filter) {
            for (let filterName in optionData.value) {
                label += `${optionData.value[filterName].filter[0].label} ${
                    optionData.value.length - 1 > filterName ? "|" : ""
                }`;
            }
        }
        return (
            <div
                ref={innerRef}
                {...innerProps}
                className={classes.option}
                style={{background: isFocused ? theme.palette.hover.select : "inherit"}}>
                <div onClick={() => addFilter(optionData)}>
                    <SmallTitle className={classes.optionTitle}>{children}</SmallTitle>
                    <Text className={classes.optionLabelText}>{label}</Text>
                </div>
                <div className={classes.optionLabel} onClick={() => deleteFilter(parseInt(optionData.id))}>
                    <Icon size={16}>Delete</Icon>
                </div>
            </div>
        );
    };

    return (
        <div className={classes.recentSearch}>
            {!error ? (
                <Fragment>
                    <Select
                        isLoading={loading || loadingDelete}
                        options={options}
                        value={{label: t("filter.search.recentSaved")}}
                        styles={customStylesRecentSearch(theme)}
                        theme={(selectTheme) => ({
                            ...selectTheme,
                            colors: {
                                ...selectTheme.colors,
                                neutral0: theme.palette.background.paper,
                                neutral50: theme.palette.text.primary,
                            },
                        })}
                        components={{Option}}
                        onChange={(e) => addFilter(e)}
                    />
                    <Helmet>
                        <style>
                            {`
                                .react-select__option.react-select__option--is-focused {
                                    background: ${theme.palette.hover.select} !important;
                                }
                            `}
                        </style>
                    </Helmet>
                </Fragment>
            ) : (
                <Error errorMessage={error || errorDelete} />
            )}
        </div>
    );
};

export default withStyles(SearchStyle)(RecentSearch);

const GET_SEARCH_FILTER_BU_USER = gql`
    query getSearchFiltersByUser($path: String!) {
        getSearchFiltersByUser(path: $path) {
            id
            type
            title
            filter
        }
    }
`;

const DELETE_SEARCH_FILTER_BU_USER = gql`
    mutation deleteSearchFilter($id: Int!) {
        deleteSearchFilter(id: $id) {
            id
        }
    }
`;
