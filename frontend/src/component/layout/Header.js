/* eslint-disable react/no-direct-mutation-state */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Moment from 'moment';
import { getAllNotifications, getLimitNotifications } from "../../actions/notificationAction";
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

const Header = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { notifications } = useSelector((state) => state.notifications);
  const [open, setOpen] = React.useState(true);
  const [openDropdown, setDropdown] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);
  const [notif, setNotif] = React.useState(false);
  const handle = () => {
    if (!openDropdown) setDropdown(true);
    else setDropdown(false);
  };
  const handleDrawerOpen = () => {
    if (!open) setOpen(true);
    else setOpen(false);
  };

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenNotifications = () => {
    setNotif(true);
  };
  const handleCloseNotifications= () => {
    setNotif(null);
  };
  const getUnreadCount = (notifications) => {
    let count = 0;
    notifications.forEach(notif => {
        if(!notif.read.seen) count++;
    });
    return count;
  }
  useEffect(() => {
    dispatch(getLimitNotifications(4));
  }, [dispatch])
  
  return (
    <>
      <div>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 5 }}
            >
              <MenuIcon />
            </IconButton>
            {isAuthenticated && notifications && <Box sx={{ flexGrow: 0 }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => handleOpenNotifications()}
              >
                <Badge badgeContent={getUnreadCount(notifications)} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            
              <Menu
                sx={{ mt: "45px", paddingTop: "0rem", width: "23.2rem" }}
                id="menu-appbar"
                anchorEl={notif}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(notif)}
                onClose={handleCloseNotifications}
              >
                <Box
                  sx={{
                    backgroundColor: "#6610F2",
                    margin: "0 8px",
                    width: "20rem",
                    color: "white",
                    padding: "2px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight:"2rem"
                  }}
                >
                  <h4 className="m-b-0 m-t-5">{getUnreadCount(notifications)} New</h4>

                  <h6>Notifications</h6>
                </Box>
                <ul style={{listStyleType:"none"}}>
                {notifications.slice(0, 4).map((notif,idx)=>
                    <li className="mt-2" key={idx}>
                      <div className="message-center" >
                          {/* <!-- Message --> */}
                          <Link >
                            <div style={{display:"flex"}}>
                            <div className="btn btn-danger btn-circle"><i className="fa fa-bell"></i></div>
                              <div className="mail-contnet" style={{display:"flex",flexDirection:"column",marginLeft:"0.8rem"}}>
                                  <h5 atyle={{fontWeight:"bold",color:"black"}}>{ notif.title } </h5>
                                  <span className="mail-desc" style={{fontSize:"0.8rem",fontWeight:"lighter",color:"black"}}>{ notif.description }</span>
                                  <span className="time" style={{fontSize:"0.8rem",fontWeight:"lighter",color:"black"}}> { Moment(notif.timestamp).format('DD MMM yyyy, hh:mm a') } </span>
                              </div>
                            </div>
                          </Link>
                      </div>
                    </li>
                )}
                  <Link to='/notifications'>
                    <li>
                      <div className="nav-link text-center" style={{color:"black"}}> <strong>All notifications</strong> <i className="fa fa-angle-right"></i> </div>
                    </li>
                  </Link>
                </ul>
              </Menu>
            </Box>}
            <div style={{ display: "flex", margin: "0 auto" }}>
              <img
                alt="logo-img"
                src="https://res.cloudinary.com/djik7nh4k/image/upload/v1682878276/NIT-Kurukshetra-Logo_dakhsx.png"
                height="40"
                width="45"
                style={{ marginRight: "0.5rem" }}
              />
              {!open && (
                <Typography variant="h6" noWrap component="div">
                  Placement Portal
                </Typography>
              )}
            </div>
            {isAuthenticated && user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                  <IconButton
                    onClick={() => handleOpenUserMenu()}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={`assets/images/profile/${user.gender}.png`}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px", paddingTop: "0rem", width: "16rem" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box
                    sx={{
                      backgroundColor: "#6610F2",
                      margin: "0 8px",
                      width: "13rem",
                      color: "white",
                      padding: "2px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h4>
                      <b>{user.name}</b>
                    </h4>

                    <h5>{user.permission.toUpperCase()}</h5>
                  </Box>
                  <MenuItem>
                    <div className="dropdown-divider"></div>{" "}
                  </MenuItem>
                  <MenuItem>
                    <Link to="/profile">
                      <i className="ti-user m-r-5 m-l-5"></i> My Profile
                    </Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    <Link to="/notifications">
                      <i className="ti-user m-r-5 m-l-5"></i> My Notifications
                    </Link>{" "}
                  </MenuItem>
                  {user.permission !== "admin" && (
                    <MenuItem>
                      <Link to="/timeline" ng-show="!main.authorized">
                        <i className="ti-stats-up m-r-5 m-l-5"></i> My Timeline
                      </Link>{" "}
                    </MenuItem>
                  )}
                  {user.permission !== "admin" && (
                    <MenuItem>
                      <Link to="/achievement" ng-show="!main.authorized">
                        <i className="ti-medall m-r-5 m-l-5"></i> My Achievements
                      </Link>{" "}
                    </MenuItem>
                  )}
                  <MenuItem>
                    <Link to="/announcements">
                      <i className="ti-announcement m-r-5 m-l-5"></i> Announcements
                    </Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    <Link to="/settings">
                      <i className="ti-settings m-r-5 m-l-5"></i> Account Settings
                    </Link>{" "}
                  </MenuItem>
                  <MenuItem>
                    <div className="p-l-30 p-10">
                      <Link
                        to="/logout"
                        className="btn btn-sm btn-success btn-rounded center"
                      >
                        Logout
                      </Link>
                    </div>{" "}
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          style={{ zIndex: "1 !important" }}
        >
          <DrawerHeader></DrawerHeader>
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              {isAuthenticated && (
                <li>
                  {" "}
                  <Link
                    className="nav-toggler waves-effect waves-dark"
                    to="/"
                    aria-expanded="false"
                  >
                    <i className="ti-home"></i>
                    {open && <span className="hide-menu">Home</span>}
                  </Link>
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  {" "}
                  <Link
                    className="nav-toggler waves-effect waves-dark"
                    to="/login"
                    aria-expanded="false"
                  >
                    <i className="icon-login"></i>
                    {open && <span className="hide-menu">Login </span>}
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  {" "}
                  <Link
                    className="nav-toggler waves-effect waves-dark"
                    to="/company-registration"
                    aria-expanded="false"
                  >
                    <i className="icon-briefcase"></i>
                    {open && (
                      <span className="hide-menu">Company Registration</span>
                    )}
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  {" "}
                  <Link
                    className="nav-toggler waves-effect waves-dark"
                    to="/interview-experiences"
                    aria-expanded="false"
                  >
                    <i className="icon-rocket"></i>
                    {open && (
                      <span className="hide-menu">Interview Experiences </span>
                    )}
                  </Link>
                </li>
              )}
              {isAuthenticated &&
                user &&
                (user.permission === "spc" || user.permission === "admin") && (
                  <li>
                    {" "}
                    <Link
                      className="nav-toggler waves-effect waves-dark"
                      to="/add-new-company"
                      aria-expanded="false"
                    >
                      <i className="icon-briefcase"></i>
                      {open && <span className="hide-menu">Add New Company</span>}
                    </Link>
                  </li>
                )}
              {isAuthenticated &&
                user &&
                (user.permission === "spc" || user.permission === "admin") && (
                  <li>
                    {" "}
                    <Link
                      className="nav-toggler waves-effect waves-dark"
                      to="/admin-management"
                      aria-expanded="false"
                    >
                      <i className="icon-fire"></i>
                      {open && <span className="hide-menu">Admin Management</span>}
                    </Link>
                  </li>
                )}
              {isAuthenticated && (
                <li>
                  {" "}
                  <Link
                    className="nav-toggler waves-effect waves-dark"
                    to="/announcements"
                    aria-expanded="false"
                  >
                    <i className="ti-announcement"></i>
                    {open && <span className="hide-menu">Announcements </span>}
                  </Link>
                </li>
              )}
              {isAuthenticated &&
                user &&
                (user.permission === "spc" ||
                  user.permission === "student") && (
                  <li>
                    {" "}
                    <Link
                      className="waves-effect waves-dark"
                      onClick={handle}
                      aria-expanded="false"
                    >
                      <i className="icon-user"></i>
                      {open && <span className="hide-menu">User Profile</span>}
                      {open && (
                        <ArrowForwardIosOutlinedIcon
                          style={{ fontSize: "0.9rem" }}
                        />
                      )}
                    </Link>
                    {openDropdown && open && (
                      <ul>
                        <li>
                          <Link className="nav-toggler hide-menu" to="/profile">
                            Profile Page <i className="ti-user text-success"></i>
                          </Link>
                        </li>
                        {/* <li><Link className="nav-toggler hide-menu" to="/red-flag-history">Red Flag History <i className="ti-alert text-danger"></i></Link></li> */}
                        <li>
                          <Link className="nav-toggler hide-menu" to="/timeline">
                            Timeline <i className="ti-stats-up text-info"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-toggler hide-menu"
                            to="/notifications"
                          >
                            Notifications <i className="ti-bell text-info"></i>
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-toggler hide-menu" to="/achievement">
                            Achievement <i className="ti-medall text-danger"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-toggler hide-menu"
                            to="/contributions"
                          >
                            Contributions <i className="ti-crown text-success"></i>
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-toggler hide-menu" to="/settings">
                            Account Settings{" "}
                            <i className="ti-settings text-success"></i>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
              <li>
                {" "}
                <Link
                  className="nav-toggler waves-effect waves-dark"
                  to="/team"
                  aria-expanded="false"
                >
                  <i className="icon-people"></i>
                  {open && <span className="hide-menu">Team</span>}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  className="nav-toggler waves-effect waves-dark"
                  to="/technical"
                  aria-expanded="false"
                >
                  <i className="icon-screen-desktop"></i>
                  {open && <span className="hide-menu">Developer</span>}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  className="nav-toggler waves-effect waves-dark"
                  to="/contact"
                  aria-expanded="false"
                >
                  <i className="icon-phone"></i>
                  {open && <span className="hide-menu">Contact Us </span>}
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  className="nav-toggler waves-effect waves-dark"
                  to="/visitors"
                  aria-expanded="false"
                >
                  <i className="icon-briefcase"></i>
                  {open && <span className="hide-menu">Companies Visited </span>}
                </Link>
              </li>
            </ul>
          </nav>
        </Drawer>
      </div>
    </>
  );
};

export default Header;
