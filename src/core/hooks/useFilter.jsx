import {useState} from "react";

export const useFilter = ({defaultOrderKey = null, defaultOrderLabel = null, defaultOrderDirection = "DESC"}) => {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState([]);
    const [filtersValue, setFiltersValue] = useState([]);
    const [orderDirection, setOrderDirection] = useState(defaultOrderDirection);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalInstances, setTotalInstances] = useState(0);
    const [open, setOpen] = useState(false);
    const [orderValue, setOrderValue] = useState({
        key: defaultOrderKey,
        label: defaultOrderLabel,
    });

    return {
        orders,
        setOrders,
        filters,
        setFilters,
        filtersValue,
        setFiltersValue,
        orderDirection,
        setOrderDirection,
        page,
        setPage,
        totalPage,
        setTotalPage,
        open,
        setOpen,
        orderValue,
        setOrderValue,
        totalInstances,
        setTotalInstances,
    };
};
