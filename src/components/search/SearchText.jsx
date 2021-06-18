import React, {useState, useEffect} from "react";
import Input from "../input/Input";
import Icon from "../icon/Icon";
import {useDebounce} from "use-debounce";

const SearchText = ({placeholderOrder, loading, setSearch}) => {
    const [searchText, setSearchText] = useState("");
    const [research] = useDebounce(searchText, 500);

    useEffect(() => {
        setSearch(research);
    }, [research, setSearch]);

    return (
        <Input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder={placeholderOrder}
            autoFocus
            endAdornment={<Icon size={16}>{loading ? "Loading" : "Search"}</Icon>}
        />
    );
};

export default SearchText;
