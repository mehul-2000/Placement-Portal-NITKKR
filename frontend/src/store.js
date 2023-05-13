import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, forgotPasswordReducer, resetPasswordReducer, profileReducer, resumeReducer, batchReducer, infoReducer} from "./reducers/userReducer";
import { newCompanyReducer, companyReducer, companyDetailsReducer, registeredStudentsReducer } from "./reducers/companyReducer";
import { coordinatorReducer, newCoordinatorReducer } from "./reducers/coordinatorReducer";
import { studentReducer } from "./reducers/studentReducer";
import { newInterviewReducer, interviewsReducer, interviewDetailsReducer } from "./reducers/interviewReducer";
import { newPlacementReducer, placementsReducer } from "./reducers/placementReducer";
import { applicationStatusReducer, applyReducer, withdrawReducer } from "./reducers/applyReducer";
import { announcementReducer, newAnnouncementReducer } from "./reducers/announcementReducer";
import { newNotificationReducer, notificationReducer } from "./reducers/notificationReducer";

const reducer = combineReducers({
    user: userReducer,
    company: newCompanyReducer,
    companies: companyReducer,
    companyDetails: companyDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    profile: profileReducer,
    resume: resumeReducer,
    batch: batchReducer,
    coordinators: coordinatorReducer,
    coordinator: newCoordinatorReducer,
    student: studentReducer,
    interview: newInterviewReducer,
    interviews: interviewsReducer,
    interviewDetails: interviewDetailsReducer,
    placements: placementsReducer,
    placement: newPlacementReducer,
    applicationStatus: applicationStatusReducer,
    apply: applyReducer,
    withdraw: withdrawReducer,
    registeredStudents: registeredStudentsReducer,
    info: infoReducer,
    announcements: announcementReducer,
    announcement: newAnnouncementReducer,
    notifications: notificationReducer,
    notification: newNotificationReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;