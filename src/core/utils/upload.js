import axios from "axios";
import {ENDPOINT, ACCESS_TOKEN_NAME} from "../constants";
import {getLocalstorage} from "../localstorage/localStorage";

export const upload = (params) => {
    return new Promise((resolve) => {
        const formData = new FormData();

        formData.append("file", params.file);

        axios({
            method: "post",
            url: `${ENDPOINT}/file-upload`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                [ACCESS_TOKEN_NAME]: getLocalstorage(ACCESS_TOKEN_NAME),
            },
        })
            .then((res) => {
                resolve({
                    loading: false,
                    success: true,
                    pourcentage: 100,
                    error: "",
                    url: res.data.location,
                });
            })
            .catch((error) => {
                resolve({loading: true, success: false, pourcentage: 0, error: error.code, url: ""});
            });
    });
};
