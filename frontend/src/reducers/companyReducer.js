import {
    CREATE_COMPANY_FAIL,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_RESET,
    UPCOMING_COMPANIES_FAIL,
    UPCOMING_COMPANIES_REQUEST,
    UPCOMING_COMPANIES_SUCCESS,
    COMPANY_DETAILS_FAIL,
    COMPANY_DETAILS_REQUEST,
    COMPANY_DETAILS_SUCCESS,
    EDIT_COMPANY_FAIL,
    EDIT_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    EDIT_COMPANY_RESET,
    REGISTERED_STUDENTS_FAIL,
    REGISTERED_STUDENTS_REQUEST,
    REGISTERED_STUDENTS_SUCCESS,
    DELETE_COMPANY_FAIL,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_RESET,
    DELETE_COMPANY_SUCCESS,
    CLEAR_ERRORS,
} from "../constants/companyConstants";
export const newCompanyReducer = (state = { company:{} }, action) => {
    switch(action.type) {
        case CREATE_COMPANY_REQUEST:
        case EDIT_COMPANY_REQUEST:
        case DELETE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_COMPANY_SUCCESS:
        case EDIT_COMPANY_SUCCESS:
            return {
                loading: false,
                company: action.payload.company,
                successMsg: action.payload.message
            };
        case DELETE_COMPANY_SUCCESS:
            return {
                loading: false,
                successMsg: action.payload.message
            }
        case CREATE_COMPANY_FAIL:
        case EDIT_COMPANY_FAIL:
        case DELETE_COMPANY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case EDIT_COMPANY_RESET:
        case CREATE_COMPANY_RESET:
        case DELETE_COMPANY_RESET:
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

export const companyDetailsReducer = (state = { }, action) => {
    switch (action.type) {
        case COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMPANY_DETAILS_SUCCESS:
            return {
                loading: false,
                company: action.payload.company,
            }
        case COMPANY_DETAILS_FAIL:
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

export const registeredStudentsReducer = (state = { }, action) => {
    switch (action.type) {
        case REGISTERED_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTERED_STUDENTS_SUCCESS:
            return {
                loading: false,
                students: action.payload.company,
            }
        case REGISTERED_STUDENTS_FAIL:
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


