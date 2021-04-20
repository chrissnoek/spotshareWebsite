exports.id = "server";
exports.modules = {

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoDetailStrapi.jsx */ "./src/PhotoDetailStrapi.jsx");
/* harmony import */ var _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocationDetailStrapi.jsx */ "./src/LocationDetailStrapi.jsx");
/* harmony import */ var _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoAddStrapi.jsx */ "./src/PhotoAddStrapi.jsx");
/* harmony import */ var _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoAddToLocation.jsx */ "./src/PhotoAddToLocation.jsx");
/* harmony import */ var _Home_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Home.jsx */ "./src/Home.jsx");
/* harmony import */ var _NotFound_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NotFound.jsx */ "./src/NotFound.jsx");
/* harmony import */ var _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BlogPost.jsx */ "./src/BlogPost.jsx");
/* harmony import */ var _RegisterHooks_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./RegisterHooks.jsx */ "./src/RegisterHooks.jsx");
/* harmony import */ var _LoginHooks_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoginHooks.jsx */ "./src/LoginHooks.jsx");
/* harmony import */ var _Logout_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Logout.jsx */ "./src/Logout.jsx");
/* harmony import */ var _ForgotPassword_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ForgotPassword.jsx */ "./src/ForgotPassword.jsx");
/* harmony import */ var _PasswordReset_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PasswordReset.jsx */ "./src/PasswordReset.jsx");
/* harmony import */ var _Profile_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Profile.jsx */ "./src/Profile.jsx");
/* harmony import */ var _FBConnect_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FBConnect.jsx */ "./src/FBConnect.jsx");
/* harmony import */ var _ProfileEdit_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ProfileEdit.jsx */ "./src/ProfileEdit.jsx");
/* harmony import */ var _components_CategorySearch_LocationsPerCategorie_jsx__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/CategorySearch/LocationsPerCategorie.jsx */ "./src/components/CategorySearch/LocationsPerCategorie.jsx");
/* harmony import */ var _components_Results_Results_jsx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/Results/Results.jsx */ "./src/components/Results/Results.jsx");
/* harmony import */ var _components_Dashboard_Dashboard_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/Dashboard/Dashboard.jsx */ "./src/components/Dashboard/Dashboard.jsx");
/* harmony import */ var _components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/notificationCenter/notifications.jsx */ "./src/components/notificationCenter/notifications.jsx");



















const routes = [{
  path: "/aanmelden",
  component: _RegisterHooks_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
  exact: true
}, {
  path: "/inloggen",
  component: _LoginHooks_jsx__WEBPACK_IMPORTED_MODULE_8__["default"],
  exact: true
}, {
  path: "/uitloggen",
  component: _Logout_jsx__WEBPACK_IMPORTED_MODULE_9__["default"],
  exact: true
}, {
  path: "/wachtwoord-vergeten",
  component: _ForgotPassword_jsx__WEBPACK_IMPORTED_MODULE_10__["default"],
  exact: true
}, {
  path: "/wachtwoord-resetten",
  component: _PasswordReset_jsx__WEBPACK_IMPORTED_MODULE_11__["default"],
  exact: true
}, {
  path: "/foto/toevoegen",
  component: _PhotoAddStrapi_jsx__WEBPACK_IMPORTED_MODULE_2__["default"],
  exact: true
}, {
  path: "/foto/toevoegen/:id",
  component: _PhotoAddToLocation_jsx__WEBPACK_IMPORTED_MODULE_3__["default"],
  exact: true
}, {
  path: "/fotograaf/:slug",
  component: _Profile_jsx__WEBPACK_IMPORTED_MODULE_12__["default"],
  exact: true
}, {
  path: "/foto/:id",
  component: _PhotoDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_0__["default"],
  exact: true
}, {
  path: "/fotolocatie/:id",
  component: _LocationDetailStrapi_jsx__WEBPACK_IMPORTED_MODULE_1__["default"],
  exact: true
}, {
  path: "/fotolocaties/categorie/:value",
  component: _components_CategorySearch_LocationsPerCategorie_jsx__WEBPACK_IMPORTED_MODULE_15__["default"],
  exact: true
}, {
  path: "/fotolocaties/resultaten",
  component: _components_Results_Results_jsx__WEBPACK_IMPORTED_MODULE_16__["default"],
  exact: true
}, //{ path: "/fotos", component: PhotoListStrapi },
{
  path: "/connect/facebook",
  component: _FBConnect_jsx__WEBPACK_IMPORTED_MODULE_13__["default"]
}, //{ path: "/bewerken/:id", component: PhotoEdit, exact: true },
{
  path: "/profiel/bewerken/:slug",
  component: _ProfileEdit_jsx__WEBPACK_IMPORTED_MODULE_14__["default"]
}, //{ path: "/report", component: PhotoReport },
//{ path: "/about", component: About },
{
  path: "/",
  component: _Home_jsx__WEBPACK_IMPORTED_MODULE_4__["default"],
  exact: true
}, {
  path: "/dashboard",
  component: _components_Dashboard_Dashboard_jsx__WEBPACK_IMPORTED_MODULE_17__["default"],
  exact: true
}, {
  path: "/niet-gevonden",
  component: _NotFound_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
  exact: true
}, {
  path: "/*",
  component: _BlogPost_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ })

};
//# sourceMappingURL=server.b093604773dda352608f.hot-update.js.map