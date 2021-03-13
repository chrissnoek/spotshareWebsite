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
  user
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute bg-white rounded py-6 border z-10 right-0",
    id: "notifications"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-black"
  }, "Meldingen"), user.receivedNotifications && user.receivedNotifications.map(notification => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Notification, {
      key: notification.id,
      notification: notification
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Notifications);

const Notification = ({
  notification
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

  const generateLink = () => {
    const className = "absolute top-0 left-0 w-full h-full z-10";

    if (notification.action === "like" || notification.action === "comment") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: `/foto/${photo.slug}`,
        className: className
      });
    }

    if (notification.action === "follow") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: `/fotograaf/${giver.slug}`,
        className: className
      });
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex relative my-4 hover:bg-gray-100"
  }, generateLink(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
    profile: notification.giver,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, generateText())));
};

/***/ })

};
//# sourceMappingURL=server.235dc3235df4a89757bc.hot-update.js.map