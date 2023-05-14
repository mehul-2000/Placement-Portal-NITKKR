import {
    SEND_OTP_FAIL,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_RESUME_FAIL,
    UPDATE_RESUME_REQUEST,
    UPDATE_RESUME_SUCCESS,
    UPDATE_BATCH_FAIL,
    UPDATE_BATCH_REQUEST,
    UPDATE_BATCH_SUCCESS,
    GET_TIMELINE_FAIL,
    GET_TIMELINE_REQUEST,
    GET_TIMELINE_SUCCESS,
    GET_ACHIEVEMENTS_FAIL,
    GET_ACHIEVEMENTS_REQUEST,
    GET_ACHIEVEMENTS_SUCCESS,
    CLEAR_ERRORS,
    GET_CONTRIBUTIONS_REQUEST,
    GET_CONTRIBUTIONS_SUCCESS,
    GET_CONTRIBUTIONS_FAIL
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
            'https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/sendOTP',
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
            'https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/login',
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

// Logout User
export const logout = () => async (dispatch) => {
    try {
        dispatch({type: LOGOUT_REQUEST});
        await axios.get('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/logout');
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch(error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/profile');
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

// Update user profile
export const updateProfile = (profileData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/updateProfile", profileData, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update resume
export const updateResume = (resume) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESUME_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        const { data } = await axios.post("https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/upload/resume", resume, config);
        dispatch({ type: UPDATE_RESUME_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_RESUME_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Batch
export const updateAdminBatch = (batch) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BATCH_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/updateBatch", {batch}, config);
        dispatch({ type: UPDATE_BATCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_BATCH_FAIL,
            payload: error.response.data.message
        })
    }
}

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
            'https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/password/forgot',
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

// Update Password
export const changePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.put(
            "api/user/password/update",
            passwords,
            config
        );
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getTimeline = () => async (dispatch) => {
    try {
        dispatch({type:GET_TIMELINE_REQUEST});
        const {data} = await axios.get('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/timeline');
        dispatch({
            type: GET_TIMELINE_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: GET_TIMELINE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAchievements = () => async (dispatch) => {
    try {
        dispatch({type:GET_ACHIEVEMENTS_REQUEST});
        const {data} = await axios.get('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/achievements');
        dispatch({
            type: GET_ACHIEVEMENTS_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: GET_ACHIEVEMENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getContributions = () => async (dispatch) => {
    try {
        dispatch({type:GET_CONTRIBUTIONS_REQUEST});
        const {data} = await axios.get('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/user/contributions');
        dispatch({
            type: GET_CONTRIBUTIONS_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: GET_CONTRIBUTIONS_FAIL,
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