import {
    GET_STUDENT_FAIL,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_RESET,
    UPDATE_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_RESET,
    CLEAR_ERRORS
} from "../constants/studentConstants";
export const studentReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_STUDENT_REQUEST:
        case UPDATE_STUDENT_REQUEST:
            return {
                loading: true,
                isFetched: false
            }
        case GET_STUDENT_SUCCESS:
            return {
                loading: false,
                student: action.payload.user,
                isFetched: true
            }
        case GET_STUDENT_RESET:
            return {
                loading: false,
                student: null,
            }
        case UPDATE_STUDENT_SUCCESS:
            return {
                loading: false,
                student: action.payload.user,
                isFetched: true,
                isUpdated: true
            }
        case UPDATE_STUDENT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case GET_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
                isFetched: false
            }
        case UPDATE_STUDENT_FAIL:
            return {
                ...state,
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