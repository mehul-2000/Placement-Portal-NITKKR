import {
    CREATE_COMPANY_FAIL,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    UPCOMING_COMPANIES_FAIL,
    UPCOMING_COMPANIES_REQUEST,
    UPCOMING_COMPANIES_SUCCESS,
    CLEAR_ERRORS
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
        const { data } = await axios.post("/api/company/add", company, config);
        dispatch({ type: CREATE_COMPANY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_COMPANY_FAIL,
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
        const {data} = await axios.post('/api/company/getAll', {active:true}, config);
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
        const {data} = await axios.get('/api/company/getAll', {active:false});
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};