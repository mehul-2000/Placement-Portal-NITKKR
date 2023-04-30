import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, forgotPasswordReducer, resetPasswordReducer, profileReducer, resumeReducer, batchReducer} from "./reducers/userReducer";
import { newCompanyReducer, companyReducer } from "./reducers/companyReducer";
import { coordinatorReducer, newCoordinatorReducer } from "./reducers/coordinatorReducer";
import { studentReducer } from "./reducers/studentReducer";
import { newInterviewReducer, interviewsReducer, interviewDetailsReducer } from "./reducers/interviewReducer";

const reducer = combineReducers({
    user: userReducer,
    company: newCompanyReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    profile: profileReducer,
    resume: resumeReducer,
    batch: batchReducer,
    companies: companyReducer,
    coordinators: coordinatorReducer,
    coordinator: newCoordinatorReducer,
    student: studentReducer,
    interview: newInterviewReducer,
    interviews: interviewsReducer,
    interviewDetails: interviewDetailsReducer
});

let initialState = {
    // cart: {
    //     cartItems: localStorage.getItem("cartItems")
    //         ? JSON.parse(localStorage.getItem("cartItems"))
    //         : [],
    //     shippingInfo: localStorage.getItem("shippingInfo")
    //         ? JSON.parse(localStorage.getItem("shippingInfo"))
    //         : {},
    // }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;