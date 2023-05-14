import {
    CREATE_COMPANY_FAIL,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    EDIT_COMPANY_FAIL,
    EDIT_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    UPCOMING_COMPANIES_FAIL,
    UPCOMING_COMPANIES_REQUEST,
    UPCOMING_COMPANIES_SUCCESS,
    CLEAR_ERRORS,
    COMPANY_DETAILS_REQUEST,
    COMPANY_DETAILS_SUCCESS,
    COMPANY_DETAILS_FAIL,
    REGISTERED_STUDENTS_FAIL,
    REGISTERED_STUDENTS_REQUEST,
    REGISTERED_STUDENTS_SUCCESS,
    DELETE_COMPANY_FAIL,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_SUCCESS
} from "../constants/companyConstants";
import axios from "axios";

// Add new company
export const addNewCompany = (company) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COMPANY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-liart.vercel.app/api/company/add", company, config);
        dispatch({ type: CREATE_COMPANY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_COMPANY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Edit company
export const editCompany = (company) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_COMPANY_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.put("https://placement-portal-liart.vercel.app/api/company/update", company, config);
        dispatch({ type: EDIT_COMPANY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_COMPANY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Upcoming companies
export const getAllUpcomingCompanies = () => async (dispatch) => {
    try{
        dispatch({type:UPCOMING_COMPANIES_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('https://placement-portal-liart.vercel.app/api/company/getAll', {active:true}, config);
        dispatch({
            type: UPCOMING_COMPANIES_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: UPCOMING_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Upcoming companies (Admin)
export const getAllUpcomingCompaniesAdmin = (passout_batch) => async (dispatch) => {
    try{
        dispatch({type:UPCOMING_COMPANIES_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('https://placement-portal-liart.vercel.app/api/company/getAll_admin', {active:true, passout_batch}, config);
        dispatch({
            type: UPCOMING_COMPANIES_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: UPCOMING_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Previous companies
export const getAllPreviousCompanies = () => async (dispatch) => {
    try{
        dispatch({type:UPCOMING_COMPANIES_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('https://placement-portal-liart.vercel.app/api/company/getAll', {active:false}, config);
        dispatch({
            type: UPCOMING_COMPANIES_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: UPCOMING_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Previous companies (Admin)
export const getAllPreviousCompaniesAdmin = (passout_batch) => async (dispatch) => {
    try{
        dispatch({type:UPCOMING_COMPANIES_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('https://placement-portal-liart.vercel.app/api/company/getAll_admin', {active:false, passout_batch}, config);
        dispatch({
            type: UPCOMING_COMPANIES_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: UPCOMING_COMPANIES_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getCompanyDetails = (company_id) => async (dispatch) => {
    try{
        dispatch({type:COMPANY_DETAILS_REQUEST});
        const {data} = await axios.get(`https://placement-portal-liart.vercel.app/api/company/getOne/${company_id}`);
        dispatch({ type: COMPANY_DETAILS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: COMPANY_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get registered students for a company
export const getRegisteredStudents = (company_id) => async (dispatch) => {
    try{
        dispatch({type:REGISTERED_STUDENTS_REQUEST});
        const {data} = await axios.get(`https://placement-portal-liart.vercel.app/api/company/applied/${company_id}`);
        dispatch({ type: REGISTERED_STUDENTS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: REGISTERED_STUDENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete company
export const deleteCompany = (company_id) => async (dispatch) => {
    try{
        dispatch({type:DELETE_COMPANY_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post('https://placement-portal-liart.vercel.app/api/company/remove', {company_id}, config);
        dispatch({
            type: DELETE_COMPANY_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: DELETE_COMPANY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};