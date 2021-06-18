/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import slugifyRaw from "slugify";

export const isTruthy = (m) => !!m;
export const isFalsy = (m) => !m;

export const slugify = (s) => slugifyRaw(s.replaceAll(/"/g, "").replace("msg:", ""));

// eslint-disable-next-line no-empty-function
export const noop = () => {};

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const preventDefault =
    (handler, stopPropagation = false) =>
    (e) => {
        e.preventDefault();
        stopPropagation && e.stopPropagation();
        handler(e);
    };

export const withValue = (next) => (e) => next(e.currentTarget.value);

export const hoursToFloat = (value) => {
    const [hour, minutes] = (value || "00:00").split(":");

    if (isNaN(+hour) || isNaN(+minutes)) {
        return 0;
    }

    return +hour + +minutes / 60;
};

export const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    let re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
};

export const validateURL = (str) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i",
    ); // fragment locator

    return !!pattern.test(str);
};

const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return p + (q - p) * 6 * t;
            }
            if (t < 1 / 2) {
                return q;
            }
            if (t < 2 / 3) {
                return p + (q - p) * (2 / 3 - t) * 6;
            }
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);

        return hex.length === 1 ? `0${hex}` : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const stringToColour = (str) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line no-bitwise
        hash += str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash % 360;
};

export const getContrastedColor = (color) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hslToHex(color, 80, 80));

    const c = {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
    };

    return c.red * 0.299 + c.green * 0.587 + c.blue * 0.114 > 186;
};

export const getJsonFromUrl = (url) => {
    let query = url.substr(1),
        result = {};

    query.split("&").forEach((part) => {
        let item = part.split("=");

        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
};

export const lightenColor = (colors, percent) => {
    const color = colors.replace("#", "");

    const num = parseInt(color, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;

    return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
        .toString(16)
        .slice(1)}`;
};

export const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};

export const htmlToText = (str) => {
    let regex = /(<([^>]+)>)/gi;

    return str.replace(regex, "");
};

export const bytesToSize = (bytes) => {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"],
        i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (bytes === 0) {
        return "0 Byte";
    }

    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};
