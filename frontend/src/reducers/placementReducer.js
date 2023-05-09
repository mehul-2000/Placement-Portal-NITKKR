import {
    CREATE_PLACEMENT_FAIL,
    CREATE_PLACEMENT_REQUEST,
    CREATE_PLACEMENT_RESET,
    CREATE_PLACEMENT_SUCCESS,
    EDIT_PLACEMENT_FAIL,
    EDIT_PLACEMENT_REQUEST,
    EDIT_PLACEMENT_RESET,
    EDIT_PLACEMENT_SUCCESS,
    GET_PLACEMENTS_FAIL,
    GET_PLACEMENTS_REQUEST,
    GET_PLACEMENTS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/placementConstants";
export const newPlacementReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_PLACEMENT_REQUEST:
        case EDIT_PLACEMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_PLACEMENT_SUCCESS:
        case EDIT_PLACEMENT_SUCCESS:
            return {
                loading: false,
                message: action.payload.message
            };
        case CREATE_PLACEMENT_RESET:
        case EDIT_PLACEMENT_RESET:
            return {
                loading: false,
                message: null
            };
        case CREATE_PLACEMENT_FAIL:
        case EDIT_PLACEMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const placementsReducer = (state = { placements:[] }, action) => {
    switch(action.type) {
        case GET_PLACEMENTS_REQUEST:
            return {
                loading: true,
                placements: [],
            }
        case GET_PLACEMENTS_SUCCESS:
            return {
                loading: false,
                placements: action.payload.placements,
            }
        case GET_PLACEMENTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
