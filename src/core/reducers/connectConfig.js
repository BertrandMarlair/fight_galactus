export const initialState = {
    connected: true,
    user: {},
};

export const CONNECTED = "CONNECTED";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const toggleConnection = () => ({
    type: CONNECTED,
});

export default function LoginReducer(state = initialState, {type, payload}) {
    switch (type) {
        case CONNECTED:
            return {
                ...state,
                connected: true,
                user: {...payload, ...state.user},
            };
        case LOGOUT:
            return {
                user: {},
                connected: false,
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload,
                },
            };
        default:
            return state;
    }
}
