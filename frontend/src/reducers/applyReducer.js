import {
    APPLICATION_STATUS_FAIL,
    APPLICATION_STATUS_REQUEST,
    APPLICATION_STATUS_SUCCESS,
    APPLY_FAIL,
    APPLY_REQUEST,
    APPLY_RESET,
    APPLY_SUCCESS,
    WITHDRAW_FAIL,
    WITHDRAW_REQUEST,
    WITHDRAW_RESET,
    WITHDRAW_SUCCESS,
    CLEAR_ERRORS
} from "../constants/applyConstants";

export const applicationStatusReducer = (state = { }, action) => {
    switch (action.type) {
        case APPLICATION_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case APPLICATION_STATUS_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
            }
        case APPLICATION_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const applyReducer = (state = { }, action) => {
    switch (action.type) {
        case APPLY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case APPLY_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
            }
        case APPLY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case APPLY_RESET:
            return {
                loading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const withdrawReducer = (state = { }, action) => {
    switch (action.type) {
        case WITHDRAW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case WITHDRAW_SUCCESS:
            return {
                loading: false,
                message: action.payload.message,
            }
        case WITHDRAW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case WITHDRAW_RESET:
            return {
                loading: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};


