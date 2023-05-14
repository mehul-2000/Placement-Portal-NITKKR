import {
    APPLICATION_STATUS_FAIL,
    APPLICATION_STATUS_REQUEST,
    APPLICATION_STATUS_SUCCESS,
    APPLY_FAIL,
    APPLY_REQUEST,
    APPLY_SUCCESS,
    WITHDRAW_FAIL,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    CLEAR_ERRORS
} from "../constants/applyConstants";
import axios from "axios";

// Get Application Status
export const getApplicationStatus = (company_id) => async (dispatch) => {
    try{
        dispatch({type:APPLICATION_STATUS_REQUEST});
        const {data} = await axios.get(`https://placement-portal-liart.vercel.app/api/apply/getStatus/${company_id}`);
        dispatch({ type: APPLICATION_STATUS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: APPLICATION_STATUS_FAIL,
            payload: error.response.data.message,
        });
    }
};

//  Apply to company
export const apply = (company_id) => async (dispatch) => {
    try{
        dispatch({type:APPLY_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const {data} = await axios.post("https://placement-portal-liart.vercel.app/api/apply/apply", {company_id}, config);
        dispatch({ type: APPLY_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: APPLY_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Withdraw application of a student
export const withdrawRegistrationAdmin = (college_id, company_id) => async (dispatch) => {
    try{
        dispatch({type:WITHDRAW_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post("https://placement-portal-liart.vercel.app/api/apply/withdrawOne", {college_id, company_id}, config);
        dispatch({ type: WITHDRAW_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: WITHDRAW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Withdraw application
export const withdrawRegistrationStudent = (company_id) => async (dispatch) => {
    try{
        dispatch({type:WITHDRAW_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post("https://placement-portal-liart.vercel.app/api/apply/withdraw", {company_id}, config);
        dispatch({ type: WITHDRAW_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: WITHDRAW_FAIL,
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