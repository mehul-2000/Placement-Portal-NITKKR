import {
    GET_COORDINATORS_FAIL,
    GET_COORDINATORS_SUCCESS,
    GET_COORDINATORS_REQUEST,
    CREATE_COORDINATOR_FAIL,
    CREATE_COORDINATOR_REQUEST,
    CREATE_COORDINATOR_SUCCESS,
    CLEAR_ERRORS
} from "../constants/coordinatorConstants";
import axios from "axios";

// Get All coordinators
export const getAllCoordinators = () => async (dispatch) => {
    try{
        dispatch({type:GET_COORDINATORS_REQUEST});
        const {data} = await axios.get('https://placement-portal-liart.vercel.app/api/coordinator/getAll');
        dispatch({
            type: GET_COORDINATORS_SUCCESS,
            payload:data,
        });
    } catch(error) {
        dispatch({
            type: GET_COORDINATORS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Add new company
export const addNewCoordinator = (college_id) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COORDINATOR_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("https://placement-portal-liart.vercel.app/api/coordinator/add", {college_id}, config);
        dispatch({ type: CREATE_COORDINATOR_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_COORDINATOR_FAIL,
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