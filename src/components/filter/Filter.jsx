import React from "react";
import Tabs from "../tabs/Tabs";
import Search from "../search/Search";
import Order from "../order/Order";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import style from "./FilterStyle";
import classNames from "classnames";

const Filter = (props) => {
    const {
        loading,
        filters,
        setFiltersValue,
        orders,
        orderDirection,
        setOrderDirection,
        orderValue,
        setOrderValue,
        placeholderOrder,
        noOrder,
        noSaved,
        noMultiValues,
        defaultLabel,
        defaultKey,
        defaultSelect,
        classes,
        className,
    } = props;

    const tabClasses = classNames({
        [className]: className,
        [classes.badge]: true,
    });

    const rootClasses = classNames({
        [classes.root]: !noMultiValues,
        [classes.rootMulti]: noMultiValues,
    });

    return (
        <Tabs className={tabClasses} fullWidth>
            <div className={rootClasses}>
                <Search
                    defaultSelect={defaultSelect}
                    noSaved={noSaved}
                    noMultiValues={noMultiValues}
                    filters={filters}
                    isLoading={loading}
                    setFiltersValue={setFiltersValue}
                    defaultLabel={defaultLabel}
                    defaultKey={defaultKey}
                />
                {!noOrder && (
                    <Order
                        minWidth
                        options={orders}
                        isLoading={loading}
                        orderValue={orderValue}
                        setOrderValue={setOrderValue}
                        orderDirection={orderDirection}
                        setOrderDirection={setOrderDirection}
                        placeholder={placeholderOrder}
                    />
                )}
            </div>
        </Tabs>
    );
};

Filter.propTypes = {
    loading: PropTypes.bool.isRequired,
    filters: PropTypes.array.isRequired,
    setFiltersValue: PropTypes.func.isRequired,
    orders: PropTypes.array,
    orderDirection: PropTypes.string,
    setOrderDirection: PropTypes.func,
    orderValue: PropTypes.object,
    setOrderValue: PropTypes.func,
    placeholderOrder: PropTypes.string.isRequired,
    defaultLabel: PropTypes.string,
    defaultKey: PropTypes.string,
};

export default withStyles(style)(Filter);
