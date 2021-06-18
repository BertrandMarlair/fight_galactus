export const ENV = process.env.NODE_ENV;

export const DOMAIN = window.location.origin;

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const PROTOCOL_HTTP = window.protocolHTTP;
export const PROTOCOL_WS = window.protocolWS;

export const ENDPOINT = `${PROTOCOL_HTTP}://${window.domain}`;
export const ENDPOINT_HTTP = `${PROTOCOL_HTTP}://${window.domain}/explore`;
export const ENDPOINT_WS = `${PROTOCOL_WS}://${window.domain}/graphql`;
export const NO_AVATAR_URL = "/assets/images/no_avatar.png";

export const ONE_MINUTE = 60000;
export const FIVE_MINUTES = 300000;
export const FIFTEEN_MINUTES = 900000;
export const THIRTY_MINUTES = 1800000;
export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;

export const MAX_SNACK = 5;

export const SNACKBAR_EVENT = "new-snackbar";
export const ADD_FITLER_EVENT = "add-filter";
export const CONSOLE_EVENT = "console_item";
