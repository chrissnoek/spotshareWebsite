exports.id = "server";
exports.modules = {

/***/ "./src/Page.jsx":
/*!**********************!*\
  !*** ./src/Page.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contents_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contents.jsx */ "./src/Contents.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _components_Footer_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Footer.jsx */ "./src/components/Footer.jsx");
/* harmony import */ var _components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/notificationCenter/notifications.jsx */ "./src/components/notificationCenter/notifications.jsx");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_8__);










const NavBar = () => {
  const [isOpen, setIsOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [openNotifications, setOpenNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const notificationClick = e => {
    e.preventDefault();
    setOpenNotifications(!openNotifications);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: "bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    exact: true,
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png",
    className: "h-8",
    alt: "Spotshare, de mooiste fotolocaties bij jou in de buurt"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: toggleOpen,
    type: "button",
    className: "text-gray-400 hover:text-white focus:text-white focus:outline-none"
  }, isOpen ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiX"], {
    className: "fill-current text-white"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__["FiMenu"], {
    className: "fill-current text-white"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: `px-2 pt-2 pb-4 sm:p-0 items-center sm:flex ${isOpen ? " block" : " hidden"}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/fotolocatie/volendam",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "TestLocatie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/foto/haven-volendam",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "TestFoto"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/foto/toevoegen",
    className: "block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
  }, "Uploaden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    exact: true,
    to: "/",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Home"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_5__["userContext"].Consumer, null, value => !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/aanmelden",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Aanmelden"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/inloggen",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Inloggen")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: notificationClick,
    className: "relative block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_8__["IoNotificationsOutline"], {
    className: "text-2xl"
  })), openNotifications && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_notificationCenter_notifications_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    user: value.user
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: `/fotograaf/${value.user.slug}`,
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, value.user.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
    onClick: closeMenu,
    to: "/uitloggen",
    className: "block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
  }, "Uitloggen")))));
};

function Page() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavBar, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Contents_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Footer_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_4__["ToastContainer"], null));
}

/***/ })

};
//# sourceMappingURL=server.d8c455e6ae06e9d9c758.hot-update.js.map