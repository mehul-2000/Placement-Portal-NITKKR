import {
    GET_STUDENT_FAIL,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/studentConstants";
import axios from "axios";

// Get Student Profile
export const getStudent = (college_id) => async (dispatch) => {
    try{
        dispatch({type:GET_STUDENT_REQUEST});
        let link = `https://placement-portal-liart.vercel.app/api/user/getOne?college_id=${college_id}`;
        const {data} = await axios.get(`https://placement-portal-liart.vercel.app/api/user/getOne/${college_id}`);
        dispatch({
            type: GET_STUDENT_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: GET_STUDENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Student Profile
export const updateStudent = (student) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_STUDENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-liart.vercel.app/api/user/updateOne", student, config);
        dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};