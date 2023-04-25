import {
    SEND_OTP_FAIL,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";
export const userReducer = (state = { user:{} }, action) => {
    switch(action.type) {
        case SEND_OTP_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                isOTPSent: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                isAuthenticated: true
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case SEND_OTP_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                error_code: 404
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
                error: null,
                message: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload
            };
        case FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                error: null,
                message: null
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload
            };
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}