import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, forgotPasswordReducer, resetPasswordReducer } from "./reducers/userReducer";
import { companyReducer } from "./reducers/companyReducer";

const reducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer
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