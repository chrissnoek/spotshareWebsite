exports.id = "server";
exports.modules = {

/***/ "./src/components/notificationCenter/notifications.jsx":
/*!*************************************************************!*\
  !*** ./src/components/notificationCenter/notifications.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");





const Notifications = ({
  user,
  onClick
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute bg-white rounded py-6 border z-10 right-0 shadow-lg",
    id: "notifications"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-black pl-6"
  }, "Meldingen"), user.receivedNotifications && user.receivedNotifications.map(notification => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Notification, {
      onClick: onClick,
      key: notification.id,
      notification: notification
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Notifications);

const Notification = ({
  notification,
  onClick
}) => {
  const {
    giver,
    photo
  } = notification;
  console.log(notification);

  const generateText = () => {
    if (notification.action === "like") {
      return `${!giver.firstame ? giver.username : giver.firstname} vind je foto ${photo.title} leuk`;
    }

    if (notification.action === "comment") {
      return `${!giver.firstame ? giver.username : giver.firstname} heeft gereageerd op je foto ${photo.title}`;
    }

    if (notification.action === "follow") {
      return `${!giver.firstame ? giver.username : giver.firstname} volgt je nu!`;
    }
  };

  const goToPage = () => {
    if (notification.action === "like" || notification.action === "comment") {
      onClick(`/foto/${photo.slug}`);
    }

    if (notification.action === "follow") {
      onClick(`/fotograaf/${giver.slug}`);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: goToPage,
    className: "flex items-center relative my-2 px-6 py-4 hover:bg-gray-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
    profile: notification.giver,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, generateText())));
};

/***/ })

};
//# sourceMappingURL=server.775dd89552d930c0b51c.hot-update.js.map