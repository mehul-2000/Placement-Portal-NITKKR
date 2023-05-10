import React, { useEffect } from 'react';
import './App.css';
import Footer from './component/layout/Footer';
// import Header from './component/layout/Header';
import {  BrowserRouter as Router,Route } from "react-router-dom"
import { Routes } from "react-router-dom";
import store from './store';
import { loadUser } from './actions/userAction';
import Login from './component/User/Login';
import Team from './component/Team/Team';
import Contact from './component/Contact/Contact'
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
import Announcement from './component/Announcement/Announcement';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Router id="main-wrapper" className="App">
      {/* <Header /> */}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/add-new-company" element={<AddNewCompany />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        <Route exact path="/profile" element={<UserProfile />} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/announcement" element={<Announcement/>} />
        <Route exact path="/company-registration" element={<CompanyRegistration />} />
        <Route exact path="/admin-management" element={<AdminManagement />} />
        <Route exact path="/coordinator-management" element={<CoordinatorManagement />} />
        <Route exact path="/students-management" element={<StudentsManagement />} />
        <Route exact path="/interview-experiences" element={<InterviewExperiences />} />
        <Route exact path="/experience/:experience_id" element={<Experience />} />
        <Route exact path="/compose" element={<Compose />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
