import {
    CREATE_INTERVIEW_FAIL,
    CREATE_INTERVIEW_REQUEST,
    CREATE_INTERVIEW_SUCCESS,
    EDIT_INTERVIEW_FAIL,
    EDIT_INTERVIEW_REQUEST,
    EDIT_INTERVIEW_SUCCESS,
    GET_INTERVIEWS_FAIL,
    GET_INTERVIEWS_REQUEST,
    GET_INTERVIEWS_SUCCESS,
    INTERVIEW_DETAILS_FAIL,
    INTERVIEW_DETAILS_REQUEST,
    INTERVIEW_DETAILS_SUCCESS,
    UPDATE_STATUS_FAIL,
    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/interviewConstants";
import axios from "axios";

// Add new Interview Experience
export const addNewInterview = (interview) => async (dispatch) => {
    console.log(interview.get("tags"))
    try {
        dispatch({ type: CREATE_INTERVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("/api/interview/add", interview, config);
        dispatch({ type: CREATE_INTERVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_INTERVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Edit Interview Experience
export const editInterview = (interview) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_INTERVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("/api/interview/edit", interview, config);
        dispatch({ type: EDIT_INTERVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_INTERVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Interview Experiences
export const getAllInterviews = () => async (dispatch) => {
    try{
        dispatch({type:GET_INTERVIEWS_REQUEST});
        const {data} = await axios.get('/api/interview/getAll');
        dispatch({ type: GET_INTERVIEWS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_INTERVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Interview Experiences Admin
export const getAllAdminInterviews = () => async (dispatch) => {
    try{
        dispatch({type:GET_INTERVIEWS_REQUEST});
        const {data} = await axios.get('/api/interview/getAll_admin');
        dispatch({ type: GET_INTERVIEWS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_INTERVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get One Interview Experiences
export const getInterviewDetails = (interview_id) => async (dispatch) => {
    try{
        dispatch({type:INTERVIEW_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/interview/getOne/${interview_id}`);
        dispatch({ type: INTERVIEW_DETAILS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: INTERVIEW_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Change Experiences status
export const changeStatus = (experience_id) => async (dispatch) => {
    console.log("Ishant Goyal")
    try{
        dispatch({type:UPDATE_STATUS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const {data} = await axios.post('/api/interview/changeStatus', {experience_id}, config);
        console.log(data);
        dispatch({ type: UPDATE_STATUS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: UPDATE_STATUS_FAIL,
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