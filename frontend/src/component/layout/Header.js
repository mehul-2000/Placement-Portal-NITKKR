// import React from 'react'

// const Header = () => {
//   return (
//     <header class="topbar">
//         <nav class="navbar top-navbar navbar-expand-md navbar-dark">
//             <div class="navbar-header">
//                 <a class="navbar-brand" href="/">
//                     <b>
//                     <img src="assets/images/favicon/logo.png" alt="homepage" class="light-logo" style={{width: "40px", height: "40px"}}/>
//                 </b>
//                 <span>
//                     <img src="assets/images/logo-text-placement.png" alt="homepage" class="dark-logo" style={{width: "112px", height: "30px"}}/>
//                 </span> </a>
//             </div>
//             <div class="navbar-collapse">
//                 <ul class="navbar-nav mr-auto">
//                     <li class="nav-item hidden-sm-up"> <a class="nav-link nav-toggler waves-effect waves-light" href="javascript:void(0)"><i class="ti-menu"></i></a></li>
//                     <li class="nav-item d-none d-lg-block"><a class="nav-link nav-lock waves-effect waves-light" href="javascript:void(0)"><i class="ti-menu"></i></a></li>

//                     <li class="nav-item dropdown" ng-show="main.isLoggedIn">
//                         <a class="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="ti-email"></i>
//                             <div ng-if="main.unreadCount > 0" class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
//                         </a>
//                         <div class="dropdown-menu mailbox animated bounceInDown">
//                             <span class="with-arrow"><span class="bg-primary"></span></span>
//                             <ul>
//                                 <li>
//                                     <div class="drop-title bg-primary text-white">
//                                         <h4 class="m-b-0 m-t-5">5 New</h4>
//                                         <span class="font-light">Notification</span>
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <div class="message-center">
//                                         <a href="javascript:void(0)" ng-repeat="notif in main.notifications">
//                                             <div class="btn btn-danger btn-circle"><i class="fa fa-bell"></i></div>
//                                             <div class="mail-contnet">
//                                                 <h5>Important Notification</h5>
//                                                 <span class="mail-desc">Demo description of notification</span>
//                                                 <span class="time">30/11/2001</span>
//                                             </div>
//                                         </a>
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <a class="nav-link text-center m-b-5" href="/notifications"> <strong>All notifications</strong> <i class="fa fa-angle-right"></i> </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </li>
//                 </ul>
//                 <ul class="navbar-nav my-lg-0" ng-show="main.isLoggedIn">
//                     <li class="nav-item dropdown">
//                         <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="" alt="user" class="img-circle" width="30" /></a>
//                         <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
//                             <span class="with-arrow"><span class="bg-primary"></span></span>
//                             <div class="d-flex no-block align-items-center p-15 bg-primary text-white m-b-10">
//                                 <div class=""><img src="" alt="user" class="img-circle" width="60" /></div>
//                                 <div class="m-l-10">
//                                     <h4 class="m-b-0">Ishant Goyal</h4>
//                                     <p class=" m-b-0"> STUDENT </p>
//                                 </div>
//                             </div>
//                             <a class="dropdown-item" href="/profile"><i class="ti-user m-r-5 m-l-5"></i> My Profile</a>
//                             <a class="dropdown-item" href="/notifications"><i class="ti-user m-r-5 m-l-5"></i> My Notifications</a>
//                             <a class="dropdown-item" href="/timeline" ng-show="!main.authorized"><i class="ti-stats-up m-r-5 m-l-5"></i> My Timeline</a>
//                             <a class="dropdown-item" href="/achievement" ng-show="!main.authorized"><i class="ti-medall m-r-5 m-l-5"></i> My Achievements</a>
//                             <a class="dropdown-item" href="/announcements"><i class="ti-announcement m-r-5 m-l-5"></i> Announcements</a>
//                             <a class="dropdown-item" href="/settings"><i class="ti-settings m-r-5 m-l-5"></i> Account Settings</a>
//                             <div class="dropdown-divider"></div>
//                             <div class="p-l-30 p-10"><a href="#" ng-click="main.logout();" class="btn btn-sm btn-success btn-rounded">Logout</a></div>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     </header>
//   )
// }

// export default Header