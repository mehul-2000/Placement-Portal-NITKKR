import {
    CREATE_COMPANY_FAIL,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    UPCOMING_COMPANIES_FAIL,
    UPCOMING_COMPANIES_REQUEST,
    UPCOMING_COMPANIES_SUCCESS,
    CLEAR_ERRORS
} from "../constants/companyConstants";
export const newCompanyReducer = (state = { company:{} }, action) => {
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

export const companyReducer = (state = { companies:[] }, action) => {
    switch (action.type) {
        case UPCOMING_COMPANIES_REQUEST:
            return {
                loading: true,
                companies: [],
            }
        case UPCOMING_COMPANIES_SUCCESS:
            return {
                loading: false,
                companies: action.payload.companies,
                numCompanies: action.payload.numCompanies
            }
        case UPCOMING_COMPANIES_FAIL:
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