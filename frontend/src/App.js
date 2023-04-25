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
import AddNewCompany from './component/Company/Admin/AddNewCompany';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import UserProfile from './component/Profile/UserProfile';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
