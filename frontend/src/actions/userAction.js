import {
    SEND_OTP_FAIL,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";
import axios from "axios";

// Send OTP
export const sendOTP = (college_id, password) => async (dispatch) => {
    try {
        dispatch({type:SEND_OTP_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(
            '/api/user/sendOTP',
            {college_id, password},
            config
        );
        dispatch({
            type: SEND_OTP_SUCCESS,
            payload:data.message,
        });
    } catch(error) {
        dispatch({
            type: SEND_OTP_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Login
export const login = (college_id, password, login_otp) => async (dispatch) => {
    try {
        dispatch({type:LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(
            '/api/user/login',
            {college_id, password, login_otp},
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload:data.message,
        });
    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/user/profile');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload:data.user,
        });
    } catch(error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (college_id) => async (dispatch) => {
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(
            '/api/user/password/forgot',
            {college_id},
            config
        );
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload:data.message,
        });
    } catch(error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.put(
            `api/user/password/reset/${token}`,
            passwords,
            config
        );
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload:data.success,
        });
    } catch(error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
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