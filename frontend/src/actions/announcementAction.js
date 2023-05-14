import {
    CREATE_ANNOUNCEMENT_FAIL,
    CREATE_ANNOUNCEMENT_REQUEST,
    CREATE_ANNOUNCEMENT_SUCCESS,
    GET_ANNOUNCEMENTS_FAIL,
    GET_ANNOUNCEMENTS_REQUEST,
    GET_ANNOUNCEMENTS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/announcementConstants";
import axios from "axios";

// Add new announcement
export const addNewAnnouncement = (announcement) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ANNOUNCEMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/announcement/add", announcement, config);
        dispatch({ type: CREATE_ANNOUNCEMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ANNOUNCEMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Announcements
export const getAllAnnouncementsStudent = () => async (dispatch) => {
    try{
        dispatch({type:GET_ANNOUNCEMENTS_REQUEST});
        const {data} = await axios.post('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/announcement/getAll');
        dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_ANNOUNCEMENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getAllAnnouncementsAdmin = (passout_batch) => async (dispatch) => {
    try{
        dispatch({type:GET_ANNOUNCEMENTS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const {data} = await axios.post('https://placement-portal-g2x2cefiv-mehul-2000.vercel.app/api/announcement/getAll', {passout_batch}, config);
        dispatch({ type: GET_ANNOUNCEMENTS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_ANNOUNCEMENTS_FAIL,
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