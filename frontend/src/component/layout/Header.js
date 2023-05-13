import React from 'react';
import { useSelector } from 'react-redux';
import { styled, useTheme } from "@mui/material/styles";
import Menu from '@mui/material/Menu';
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
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

    const {isAuthenticated, user} = useSelector(state => state.user);
    // const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [openDropdown, setDropdown] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handle = () => {
        if (!openDropdown) setDropdown(true);
        else setDropdown(false);
    }
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
                        sx={{marginRight: 5,}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ display: "flex", margin: "0 auto" }}>
                        <img alt="logo-img" src="https://res.cloudinary.com/djik7nh4k/image/upload/v1682878276/NIT-Kurukshetra-Logo_dakhsx.png" height="40" width="45" style={{ marginRight: "0.5rem" }} />
                        {!open && <Typography variant="h6" noWrap component="div">
                        Placement Portal
                        </Typography>}
                    </div>
                    {isAuthenticated && user && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip>
                        <IconButton onClick={() => handleOpenUserMenu()} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={`assets/images/profile/${user.gender}.png`} />
                        </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px', paddingTop: "0rem", width: "16rem" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Box sx={{ backgroundColor: "#6610F2", margin: "0 8px", width: "13rem", color: "white", padding: "2px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <h4><b>{user.name}</b></h4>

                                <h5>{user.permission.toUpperCase()}</h5>
                            </Box>
                            <MenuItem><div class="dropdown-divider"></div> </MenuItem>
                            <MenuItem><Link to="/profile"><i class="ti-user m-r-5 m-l-5"></i> My Profile</Link> </MenuItem>
                            <MenuItem><Link to="/notifications"><i class="ti-user m-r-5 m-l-5"></i> My Notifications</Link> </MenuItem>
                            <MenuItem><Link to="/timeline" ng-show="!main.authorized"><i class="ti-stats-up m-r-5 m-l-5"></i> My Timeline</Link> </MenuItem>
                            <MenuItem><Link to="/achievement" ng-show="!main.authorized"><i class="ti-medall m-r-5 m-l-5"></i> My Achievements</Link> </MenuItem>
                            <MenuItem><Link to="/announcements"><i class="ti-announcement m-r-5 m-l-5"></i> Announcements</Link> </MenuItem>
                            <MenuItem><Link to="/settings"><i class="ti-settings m-r-5 m-l-5"></i> Account Settings</Link> </MenuItem>
                            <MenuItem><div class="p-l-30 p-10"><Link to="/logout" class="btn btn-sm btn-success btn-rounded center">Logout</Link></div> </MenuItem>
                        </Menu>
                    </Box>}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} style={{zIndex: "1 !important"}}>
                <DrawerHeader></DrawerHeader>
                <nav class="sidebar-nav">
                <ul id="sidebarnav">
                    {isAuthenticated && <li> <Link class="nav-toggler waves-effect waves-dark" to="/" aria-expanded="false"><i class="ti-home"></i>{open && <span class="hide-menu">Home</span>}</Link></li>}
                    {!isAuthenticated && <li> <Link class="nav-toggler waves-effect waves-dark" to="/login" aria-expanded="false"><i class="icon-login"></i>{open && <span class="hide-menu">Login </span>}</Link></li>}
                    {isAuthenticated && <li> <Link class="nav-toggler waves-effect waves-dark" to="/company-registration" aria-expanded="false"><i class="icon-briefcase"></i>{open && <span class="hide-menu">Company Registration</span>}</Link></li>}
                    {isAuthenticated && <li> <Link class="nav-toggler waves-effect waves-dark" to="/interview-experiences" aria-expanded="false"><i class="icon-rocket"></i>{open && <span class="hide-menu">Interview Experiences </span>}</Link></li>}
                    {(isAuthenticated && user && (user.permission==='spc' || user.permission==='admin')) && <li> <Link class="nav-toggler waves-effect waves-dark" to="/add-new-company" aria-expanded="false"><i class="icon-briefcase"></i>{open && <span class="hide-menu">Add New Company</span>}</Link></li>}
                    {(isAuthenticated && user && (user.permission==='spc' || user.permission==='admin')) && <li> <Link class="nav-toggler waves-effect waves-dark" to="/admin-management" aria-expanded="false"><i class="icon-fire"></i>{open && <span class="hide-menu">Admin Management</span>}</Link></li>}
                    {isAuthenticated && <li> <Link class="nav-toggler waves-effect waves-dark" to="/announcements" aria-expanded="false"><i class="ti-announcement"></i>{open && <span class="hide-menu">Announcements </span>}</Link></li>}
                    {(isAuthenticated && user && (user.permission==='spc' || user.permission==='student')) && <li> <Link class="waves-effect waves-dark" onClick={handle} aria-expanded="false"><i class="icon-user"></i>{open && <span class="hide-menu">User Profile</span>}{open && <ArrowForwardIosOutlinedIcon style={{ fontSize: "0.9rem" }} />}</Link>
                        {openDropdown && open && <ul>
                            <li><Link class="nav-toggler hide-menu" to="/profile">Profile Page <i class="ti-user text-success"></i></Link></li>
                            {/* <li><Link class="nav-toggler hide-menu" to="/red-flag-history">Red Flag History <i class="ti-alert text-danger"></i></Link></li> */}
                            <li><Link class="nav-toggler hide-menu" to="/timeline">Timeline <i class="ti-stats-up text-info"></i></Link></li>
                            <li><Link class="nav-toggler hide-menu" to="/notifications">Notifications <i class="ti-bell text-info"></i></Link></li>
                            <li><Link class="nav-toggler hide-menu" to="/achievement">Achievement <i class="ti-medall text-danger"></i></Link></li>
                            <li><Link class="nav-toggler hide-menu" to="/contributions">Contributions <i class="ti-crown text-success"></i></Link></li>
                            <li><Link class="nav-toggler hide-menu" to="/settings">Account Settings <i class="ti-settings text-success"></i></Link></li>
                        </ul>}
                    </li>}
                    <li> <Link class="nav-toggler waves-effect waves-dark" to="/team" aria-expanded="false"><i class="icon-people"></i>{open && <span class="hide-menu">Team</span>}</Link></li>
                    <li> <Link class="nav-toggler waves-effect waves-dark" to="/technical" aria-expanded="false"><i class="icon-screen-desktop"></i>{open && <span class="hide-menu">Developer</span>}</Link></li>
                    <li> <Link class="nav-toggler waves-effect waves-dark" to="/contact" aria-expanded="false"><i class="icon-phone"></i>{open && <span class="hide-menu">Contact Us </span>}</Link></li>
                    <li> <Link class="nav-toggler waves-effect waves-dark" to="/visitors" aria-expanded="false"><i class="icon-phone"></i>{open && <span class="hide-menu">Companies Visited </span>}</Link></li>
                    {/* <li> <Link class="nav-toggler waves-effect waves-dark" to="/placements" aria-expanded="false"><i class="ti-crown"></i>{open && <span class="hide-menu">Hall of Fame </span>}</Link></li> */}
                </ul>
                </nav>
                
            </Drawer>  
            
            </div>
            
        </>
    )
}

export default Header