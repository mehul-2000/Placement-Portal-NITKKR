import {
    CREATE_COMPANY_FAIL,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CLEAR_ERRORS
} from "../constants/companyConstants";
export const companyReducer = (state = { user:{} }, action) => {
    switch(action.type) {
        case CREATE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_COMPANY_SUCCESS:
            return {
                loading: false,
                company: action.payload.company,
                successMsg: action.payload.message
            };
        case CREATE_COMPANY_FAIL:
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