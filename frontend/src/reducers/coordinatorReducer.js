import {
    GET_COORDINATORS_FAIL,
    GET_COORDINATORS_REQUEST,
    GET_COORDINATORS_SUCCESS,
    CREATE_COORDINATOR_FAIL,
    CREATE_COORDINATOR_REQUEST,
    CREATE_COORDINATOR_SUCCESS,
    CREATE_COORDINATOR_RESET,
    CLEAR_ERRORS
} from "../constants/coordinatorConstants";
export const coordinatorReducer = (state = { coordinators:[] }, action) => {
    switch(action.type) {
        case GET_COORDINATORS_REQUEST:
            return {
                loading: true,
                coordinators: [],
            }
        case GET_COORDINATORS_SUCCESS:
            return {
                loading: false,
                coordinators: action.payload.coordinators,
                numCoordinators: action.payload.numCoordinators
            }
        case GET_COORDINATORS_FAIL:
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

export const newCoordinatorReducer = (state = { }, action) => {
    switch(action.type) {
        case CREATE_COORDINATOR_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_COORDINATOR_SUCCESS:
            return {
                loading: false,
                successMsg: action.payload.message
            };
        case CREATE_COORDINATOR_RESET:
            return {
                loading: false,
                successMsg: null
            };
        case CREATE_COORDINATOR_FAIL:
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
