import {
    CREATE_INTERVIEW_FAIL,
    CREATE_INTERVIEW_REQUEST,
    CREATE_INTERVIEW_RESET,
    CREATE_INTERVIEW_SUCCESS,
    GET_INTERVIEWS_FAIL,
    GET_INTERVIEWS_REQUEST,
    GET_INTERVIEWS_SUCCESS,
    INTERVIEW_DETAILS_FAIL,
    INTERVIEW_DETAILS_REQUEST,
    INTERVIEW_DETAILS_SUCCESS,
    UPDATE_STATUS_FAIL,
    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_RESET,
    CLEAR_ERRORS
} from "../constants/interviewConstants";
export const newInterviewReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_INTERVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_INTERVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case CREATE_INTERVIEW_RESET:
            return {
                loading: false,
                success: false
            };
        case CREATE_INTERVIEW_FAIL:
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

export const interviewsReducer = (state = { interviews:[] }, action) => {
    switch(action.type) {
        case GET_INTERVIEWS_REQUEST:
            return {
                loading: true,
                interviews: [],
            }
        case GET_INTERVIEWS_SUCCESS:
            return {
                loading: false,
                interviews: action.payload.interviews,
            }
        case GET_INTERVIEWS_FAIL:
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

export const interviewDetailsReducer = (state = { }, action) => {
    switch (action.type) {
        case INTERVIEW_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_STATUS_REQUEST:
            return {
                ...state,
                updateLoading: true,
            }
        case INTERVIEW_DETAILS_SUCCESS:
            return {
                loading: false,
                interview: action.payload.interview,
            }
        case UPDATE_STATUS_SUCCESS:
            return {
                loading: false,
                interview: action.payload.interview,
                message: action.payload.message
            }
        case INTERVIEW_DETAILS_FAIL:
        case UPDATE_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case UPDATE_STATUS_RESET:
            return {
                ...state,
                loading: false,
                message: null
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
