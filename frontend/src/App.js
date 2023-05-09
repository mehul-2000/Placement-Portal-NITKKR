// @ts-nocheck
import React, { useEffect } from "react";
import "./App.css";

import InstituteHome from "./component/InstituteHome/InstituteHome";
import Footer from "./component/layout/Footer";
// import Header from './component/layout/Header';
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { Routes } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Login from "./component/User/Login";
import Team from "./component/Team/Team";
import AddNewCompany from "./component/Company/Admin/AddNewCompany";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import UserProfile from "./component/Profile/UserProfile";
import Developer from "./component/Developer/Developer";
import ContactUs from "./component/ContactUs/ContactUs";
import LandingPage from "./component/Home/Home";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openDropdown, setDropdown] = React.useState(false);

  const handle = () => {
    if (!openDropdown) setDropdown(true);
    else setDropdown(false);
  }
  const handleDrawerOpen = () => {
    if (!open) setOpen(true);
    else setOpen(false);
  };

  return (
    <InstituteHome />
    // <Box sx={{ display: "flex" }}>
    //   <CssBaseline />
    //   <AppBar position="fixed" open={open}>
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         edge="start"
    //         sx={{
    //           marginRight: 5,
    //         }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <div style={{ display: "flex", margin: "0 auto" }}>
    //         <img alt="logo-img" src="https://res.cloudinary.com/djik7nh4k/image/upload/v1682878276/NIT-Kurukshetra-Logo_dakhsx.png" height="40" width="45" style={{ marginRight: "0.5rem" }} />
    //         {!open && <Typography variant="h6" noWrap component="div">
    //           Placement Portal
    //         </Typography>}
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   <Drawer variant="permanent" open={open}>
    //     <DrawerHeader></DrawerHeader>
    //     <nav class="sidebar-nav">
    //       <ul id="sidebarnav">
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/" aria-expanded="false"><i class="ti-home"></i>{open && <span class="hide-menu">Home</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/login" aria-expanded="false"><i class="icon-login"></i>{open && <span class="hide-menu">Login </span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/company-registration" aria-expanded="false"><i class="icon-briefcase"></i>{open && <span class="hide-menu">Company Registration</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/interview-experiences" aria-expanded="false"><i class="icon-rocket"></i>{open && <span class="hide-menu">Interview Experiences </span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/add-new-company" aria-expanded="false"><i class="icon-briefcase"></i>{open && <span class="hide-menu">Add New Company</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/admin-management" aria-expanded="false"><i class="icon-fire"></i>{open && <span class="hide-menu">Admin Management</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/announcements" aria-expanded="false"><i class="ti-announcement"></i>{open && <span class="hide-menu">Announcements </span>}</a></li>
    //         <li> <a class="waves-effect waves-dark" href="javascript:void(0)" onClick={handle} aria-expanded="false"><i class="icon-user"></i>{open && <span class="hide-menu">User Profile</span>}{open && <ArrowForwardIosOutlinedIcon style={{ fontSize: "0.9rem" }} />}</a>
    //           {openDropdown && open && <ul aria-expanded="false">
    //             <li><a class="nav-toggler" href="/profile" class="hide-menu">Profile Page <i class="ti-user text-success"></i></a></li>
    //             <li><a class="nav-toggler" href="/red-flag-history" class="hide-menu">Red Flag History <i class="ti-alert text-danger"></i></a></li>
    //             <li><a class="nav-toggler" href="/timeline" class="hide-menu">Timeline <i class="ti-stats-up text-info"></i></a></li>
    //             <li><a class="nav-toggler" href="/notifications" class="hide-menu">Notifications <i class="ti-bell text-info"></i></a></li>
    //             <li><a class="nav-toggler" href="/achievement" class="hide-menu">Achievement <i class="ti-medall text-danger"></i></a></li>
    //             <li><a class="nav-toggler" href="/contributions" class="hide-menu">Contributions <i class="ti-crown text-success"></i></a></li>
    //             <li><a class="nav-toggler" href="/settings" class="hide-menu">Account Settings <i class="ti-settings text-success"></i></a></li>
    //           </ul>}
    //         </li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/team" aria-expanded="false"><i class="icon-people"></i>{open && <span class="hide-menu">Team</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/technical" aria-expanded="false"><i class="icon-screen-desktop"></i>{open && <span class="hide-menu">Developer</span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/contact" aria-expanded="false"><i class="icon-phone"></i>{open && <span class="hide-menu">Contact Us </span>}</a></li>
    //         <li> <a class="nav-toggler waves-effect waves-dark" href="/placements" aria-expanded="false"><i class="ti-crown"></i>{open && <span class="hide-menu">Hall of Fame </span>}</a></li>

    //       </ul>
    //     </nav>

    //   </Drawer>
    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <DrawerHeader />
    //     <Router id="main-wrapper" className="App">
    //       {/* <Header /> */}
    //       <Routes>

    //         <Route exact path="/login" element={<Login />} />
    //         <Route exact path="/team" element={<Team />} />
    //         <Route exact path="/add-new-company" element={<AddNewCompany />} />
    //         <Route exact path="/forgot-password" element={<ForgotPassword />} />
    //         <Route exact path="/reset-password/:token" element={<ResetPassword />} />
    //         <Route exact path="/profile" element={<UserProfile />} />
    //         <Route exact path="/developer" element={<Developer />} />
    //         <Route exact path="/contactus" element={<ContactUs />} />
    //         <Route exact path="/landingPage" element={<LandingPage />} />
    //         <Route path="/" element={<Navigate to="/landingPage" />} />
    //       </Routes>
    //       <Footer />
    //     </Router>
    //   </Box>
    // </Box>
  );
}

export default App;
