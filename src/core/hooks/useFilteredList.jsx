import {useState, useEffect} from "react";

export const useFilterList = (list, searchString, searchPath) => {
    const [searchContain, setSearchContain] = useState([]);

    useEffect(() => {
        if (searchPath && searchPath.length > 0) {
            setSearchContain(searchPath);
        } else {
            setSearchContain(traverse(list));
        }
        // eslint-disable-next-line
    }, [list]);

    const traverse = (x, propName = "", oldResult = []) => {
        const keyNames = Object.keys(x);

        let result = oldResult;

        keyNames.forEach((element) => {
            if (typeof x[element] === "string" && x[element] !== null) {
                if (propName) {
                    result.push(`${propName}.${element}`);
                } else {
                    result.push(element);
                }
            } else if (typeof x[element] === "object" && x[element] !== null) {
                if (!parseInt(propName) >= 0 && propName) {
                    traverse(x[element], `${propName}.${element}`, result);
                } else {
                    traverse(x[element], parseInt(element) >= 0 ? "" : element, result);
                }
            }
        });
        return [...new Set(result)];
    };

    const index = (obj, is, value) => {
        if (typeof is == "string") {
            return index(obj, is.split("."), value);
        } else if (is.length === 1 && value !== undefined) {
            return (obj[is[0]] = value);
        } else if (is.length === 0) {
            return obj;
        } else if (obj?.[is?.[0]]) {
            return index(obj[is[0]], is.slice(1), value);
        }
    };

    const createPath = (l) => {
        const res = searchContain.map((path) => index(l, path));

        return res.toString().replace(/,/g, " ");
    };

    let libraries = [];

    if (searchString?.length > 0 && list?.length > 0) {
        libraries = list.filter((l) => {
            let test = createPath(l);

            return test.toLowerCase().match(searchString.toLowerCase());
        });
    } else {
        libraries = list;
    }
    return libraries;
};
