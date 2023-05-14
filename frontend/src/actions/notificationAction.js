import {
    CREATE_NOTIFICATION_FAIL,
    CREATE_NOTIFICATION_REQUEST,
    CREATE_NOTIFICATION_SUCCESS,
    GET_NOTIFICATIONS_FAIL,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/notificationConstants"
import axios from "axios";

// Add new announcement
export const addNewNotification = (notification) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NOTIFICATION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/notification/add", notification, config);
        dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getCompanyNotifications = (companyId) => async (dispatch) => {
    try{
        dispatch({type:GET_NOTIFICATIONS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const {data} = await axios.post('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/notification/getAll', {companyId}, config);
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAllNotifications = () => async (dispatch) => {
    try{
        dispatch({type:GET_NOTIFICATIONS_REQUEST});
        const {data} = await axios.post('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/notification/getAll');
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getLimitNotifications = (limit) => async (dispatch) => {
    try{
        dispatch({ type: CREATE_NOTIFICATION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        dispatch({type:GET_NOTIFICATIONS_REQUEST});
        const {data} = await axios.post('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/notification/getAll', {limit}, config);
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const wipeAllNotifications = () => async (dispatch) => {
    try{
        await axios.put('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/notification/wipe');
    } catch(error) {}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};