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
        const { data } = await axios.post("/api/notification/add", notification, config);
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
        const {data} = await axios.post('/api/notification/getAll', {companyId}, config);
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
        const {data} = await axios.post('/api/notification/getAll');
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
        await axios.put('/api/notification/wipe');
    } catch(error) {}
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};