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
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_RESUME_FAIL,
    UPDATE_RESUME_REQUEST,
    UPDATE_RESUME_RESET,
    UPDATE_RESUME_SUCCESS,
    UPDATE_BATCH_FAIL,
    UPDATE_BATCH_REQUEST,
    UPDATE_BATCH_RESET,
    UPDATE_BATCH_SUCCESS,
    GET_TIMELINE_FAIL,
    GET_TIMELINE_REQUEST,
    GET_TIMELINE_SUCCESS,
    GET_ACHIEVEMENTS_FAIL,
    GET_ACHIEVEMENTS_REQUEST,
    GET_ACHIEVEMENTS_SUCCESS,
    GET_CONTRIBUTIONS_FAIL,
    GET_CONTRIBUTIONS_REQUEST,
    GET_CONTRIBUTIONS_SUCCESS,
    CLEAR_ERRORS,
    LOGOUT_REQUEST,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_RESET
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
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
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
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                logoutSuccess: true,
                isAuthenticated: false,
            }
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
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGOUT_RESET:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
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

export const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
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

export const resumeReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_RESUME_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_RESUME_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case UPDATE_RESUME_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_RESUME_RESET:
            return {
                ...state,
                isUpdated: false
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

export const batchReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_BATCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_BATCH_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case UPDATE_BATCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_BATCH_RESET:
            return {
                ...state,
                isUpdated: false
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

export const infoReducer = (state = { }, action) => {
    switch(action.type) {
        case GET_TIMELINE_REQUEST:
        case GET_ACHIEVEMENTS_REQUEST:
        case GET_CONTRIBUTIONS_REQUEST:
            return {
                loading: true,
            }
        case GET_TIMELINE_SUCCESS:
            return {
                loading: false,
                timeline: action.payload.timeline,
            }
        case GET_ACHIEVEMENTS_SUCCESS:
            return {
                loading: false,
                achievements: action.payload.achievements,
            }
        case GET_CONTRIBUTIONS_SUCCESS:
            return {
                loading: false,
                interviews: action.payload.interviews,
            }
        case GET_TIMELINE_FAIL:
        case GET_ACHIEVEMENTS_FAIL:
        case GET_CONTRIBUTIONS_FAIL:
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
}