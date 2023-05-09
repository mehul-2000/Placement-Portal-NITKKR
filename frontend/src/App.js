import React, { useEffect } from 'react';
import './App.css';
import Footer from './component/layout/Footer';
// import Header from './component/layout/Header';
import {  BrowserRouter as Router,Route } from "react-router-dom"
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Router id="main-wrapper" className="App">
      {/* <Header /> */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/add-new-company" element={<AddNewCompany />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/timeline" element={<Timeline />} />
        <Route exact path="/achievement" element={<Achievement />} />
        <Route exact path="/contributions" element={<Contributions />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/company-registration" element={<CompanyRegistration />} />
        <Route exact path="/previous-companies" element={<PreviousCompanies />} />
        <Route exact path="/company/:company_id" element={<Company />} />
        <Route exact path="/editCompany/:company_id" element={<EditCompany />} />
        <Route exact path="/registeredStudents/:company_id" element={<RegisteredStudents />} />
        <Route exact path="/admin-management" element={<AdminManagement />} />
        <Route exact path="/coordinator-management" element={<CoordinatorManagement />} />
        <Route exact path="/students-management" element={<StudentsManagement />} />
        <Route exact path="/interviews-management" element={<InterviewsManagaement />} />
        <Route exact path="/placement-management" element={<PlacementManagement />} />
        <Route exact path="/add-placement" element={<AddPlacement />} />
        <Route exact path="/edit-placement/:placement_id" element={<EditPlacement />} />
        <Route exact path="/interview-experiences" element={<InterviewExperiences />} />
        <Route exact path="/experience/:experience_id" element={<Experience />} />
        <Route exact path="/editExperience/:experience_id" element={<EditExperience />} />
        <Route exact path="/compose" element={<Compose />} />
        <Route exact path="/announcements" element={<Announcement />} />
        <Route exact path="/notifications" element={<Notifications />} />
        <Route exact path="/company-notification/:company_id" element={<CompanyNotification />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
