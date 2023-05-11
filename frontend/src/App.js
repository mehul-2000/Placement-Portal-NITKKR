// @ts-nocheck
import React, { useEffect } from "react";
import "./App.css";
import Footer from "./component/layout/Footer";
import Header from './component/layout/Header';
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import store from './store';
import { loadUser } from './actions/userAction';
import Login from './component/User/Login';
import Logout from './component/User/Logout';
import Team from './component/Team/Team';
import AddNewCompany from './component/Company/Admin/AddNewCompany';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import UserProfile from './component/Profile/UserProfile';
import CompanyRegistration from './component/Company/Student/CompanyRegistration';
import AdminManagement from './component/Management/AdminManagement';
import CoordinatorManagement from './component/Management/CoordinatorManagement';
import StudentsManagement from './component/Management/StudentsManagement';
import InterviewExperiences from './component/InterviewExperiences/InterviewExperiences';
import Compose from './component/InterviewExperiences/Compose';
import Experience from './component/InterviewExperiences/Experience';
import EditExperience from './component/InterviewExperiences/EditExperience';
import InterviewsManagaement from './component/Management/InterviewsManagaement';
import PlacementManagement from './component/Management/Placements/PlacementManagement';
import AddPlacement from './component/Management/Placements/AddPlacement';
import EditPlacement from './component/Management/Placements/EditPlacement';
import Company from './component/Company/Student/Company';
import EditCompany from './component/Company/Admin/EditCompany';
import RegisteredStudents from './component/Company/Student/RegisteredStudents';
import PreviousCompanies from './component/Company/Student/PreviousCompanies';
import Timeline from './component/Profile/Timeline';
import Achievement from './component/Profile/Achievement';
import Contributions from './component/Profile/Contributions';
import Settings from './component/Profile/Settings';
import Announcement from './component/Announcement/Announcement';
import CompanyNotification from './component/Company/Admin/CompanyNotification';
import Notifications from './component/Profile/Notifications';
import Developer from "./component/Developer/Developer";
import ContactUs from "./component/ContactUs/ContactUs";
import LandingPage from "./component/Home/Home";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ProtectedRoute from "./component/Route/ProtectedRoute";
// import CssBaseline from "@mui/material/CssBaseline";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
            <Routes>
              <Route path="/" element={<Navigate to="/landingPage" />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/technical" element={<Developer />} />
              <Route exact path="/contact" element={<ContactUs />} />
              
              <Route exact path="/company-registration" element={<ProtectedRoute />}>
                <Route exact path="/company-registration" element={<CompanyRegistration />} />
              </Route>

              <Route exact path="/company-registration" element={<ProtectedRoute />}>
                <Route exact path="/company-registration" element={<CompanyRegistration />} />
              </Route>

              <Route exact path="/profile" element={<ProtectedRoute />}>
                <Route exact path="/profile" element={<UserProfile />} />
              </Route>

              <Route exact path="/company-registration" element={<CompanyRegistration />} />
              <Route exact path="/previous-companies" element={<PreviousCompanies />} />
              <Route exact path="/company/:company_id" element={<Company />} />
              <Route exact path="/admin-management" element={<AdminManagement />} />
              <Route exact path="/interviews-management" element={<InterviewsManagaement />} />
              <Route exact path="/experience/:experience_id" element={<Experience />} />
              <Route exact path="/students-management" element={<StudentsManagement />} />
              <Route exact path="/achievement" element={<Achievement />} />
              <Route exact path="/announcements" element={<Announcement />} />
              <Route exact path="/team" element={<Team />} />
              <Route exact path="/add-new-company" element={<AddNewCompany />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              <Route exact path="/reset-password/:token" element={<ResetPassword />} />
              <Route exact path="/profile" element={<UserProfile />} />
              <Route exact path="/developer" element={<Developer />} />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/" element={<LandingPage />} />
            </Routes>
            <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
