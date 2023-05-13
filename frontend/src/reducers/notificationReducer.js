import {
    CREATE_NOTIFICATION_FAIL,
    CREATE_NOTIFICATION_REQUEST,
    CREATE_NOTIFICATION_SUCCESS,
    CREATE_NOTIFICATION_RESET,
    GET_NOTIFICATIONS_FAIL,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/notificationConstants"

export const newNotificationReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_NOTIFICATION_REQUEST:
            return {
                loading: true,
            };
        case CREATE_NOTIFICATION_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case CREATE_NOTIFICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CREATE_NOTIFICATION_RESET:
            return {
                loading: false,
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


export const notificationReducer = (state = { notifications:[] }, action) => {
    switch(action.type) {
        case GET_NOTIFICATIONS_REQUEST:
            return {
                loading: true,
                announcements: [],
            }
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                loading: false,
                notifications: action.payload.notifications,
            }
        case GET_NOTIFICATIONS_FAIL:
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