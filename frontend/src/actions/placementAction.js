import {
    CREATE_PLACEMENT_FAIL,
    CREATE_PLACEMENT_REQUEST,
    CREATE_PLACEMENT_SUCCESS,
    EDIT_PLACEMENT_FAIL,
    EDIT_PLACEMENT_REQUEST,
    EDIT_PLACEMENT_SUCCESS,
    GET_PLACEMENTS_FAIL,
    GET_PLACEMENTS_REQUEST,
    GET_PLACEMENTS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/placementConstants";
import axios from "axios";

// Add new Placement
export const addNewPlacement = (placement) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PLACEMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("/api/placements/add", placement, config);
        dispatch({ type: CREATE_PLACEMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_PLACEMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Edit Placement
export const editPlacement = (placement) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_PLACEMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const { data } = await axios.post("/api/placements/update", placement, config);
        dispatch({ type: EDIT_PLACEMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: EDIT_PLACEMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Placements
export const getAllPlacements = () => async (dispatch) => {
    try{
        dispatch({type:GET_PLACEMENTS_REQUEST});
        const {data} = await axios.post('/api/placements/getAll');
        dispatch({ type: GET_PLACEMENTS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_PLACEMENTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get One Placement
export const getOnePlacements = (placement_id) => async (dispatch) => {
    try{
        dispatch({type:GET_PLACEMENTS_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const {data} = await axios.post('/api/placements/getAll', {placement_id}, config);
        dispatch({ type: GET_PLACEMENTS_SUCCESS, payload: data });
    } catch(error) {
        dispatch({
            type: GET_PLACEMENTS_FAIL,
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