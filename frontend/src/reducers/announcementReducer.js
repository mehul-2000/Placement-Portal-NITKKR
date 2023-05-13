import {
    CREATE_ANNOUNCEMENT_FAIL,
    CREATE_ANNOUNCEMENT_REQUEST,
    CREATE_ANNOUNCEMENT_SUCCESS,
    CREATE_ANNOUNCEMENT_RESET,
    GET_ANNOUNCEMENTS_FAIL,
    GET_ANNOUNCEMENTS_REQUEST,
    GET_ANNOUNCEMENTS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/announcementConstants";

export const newAnnouncementReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ANNOUNCEMENT_REQUEST:
            return {
                loading: true,
            };
        case CREATE_ANNOUNCEMENT_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case CREATE_ANNOUNCEMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CREATE_ANNOUNCEMENT_RESET:
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


export const announcementReducer = (state = { announcements:[] }, action) => {
    switch(action.type) {
        case GET_ANNOUNCEMENTS_REQUEST:
            return {
                loading: true,
                announcements: [],
            }
        case GET_ANNOUNCEMENTS_SUCCESS:
            return {
                loading: false,
                announcements: action.payload.announcements,
            }
        case GET_ANNOUNCEMENTS_FAIL:
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