exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/NotificationBoard.jsx":
/*!********************************************************!*\
  !*** ./src/components/Dashboard/NotificationBoard.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io */ "react-icons/io");
/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_io__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);






const NotificationBoard = ({
  user
}) => {
  const [notifications, setNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setNotifications(user.receivedNotifications);
  }, [user.receivedNotifications]);

  const deleteNotification = async id => {
    const oldNotifications = notifications;

    const _notifications = notifications.filter(notification => {
      return notification.id != id;
    });

    setNotifications(_notifications);
    const query = `mutation deleteNotification($id:ID!){
        deleteNotification(input: { where: { id: $id } }) {
          notification {
            id
          }
        }
      }`;
    let vars = {};
    vars.id = id;
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__["default"])(query, vars, true);

    if (!data.deleteNotification.notification) {
      setNotifications(oldNotifications);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "py-6",
    id: "notifications"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-black pl-6"
  }, "Meldingen"), notifications && !notifications.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "my-2 px-6 py-4"
  }, "Er zijn geen notificaties voor je!") : notifications && notifications.map(notification => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Notification, {
      key: notification.id,
      notification: notification,
      onDeleteNotification: deleteNotification
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (NotificationBoard);

const Notification = ({
  notification,
  onDeleteNotification
}) => {
  const {
    giver,
    photo
  } = notification;
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useHistory"])();

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
      history.push(`/foto/${photo.slug}`);
    }

    if (notification.action === "follow") {
      history.push(`/fotograaf/${giver.slug}`);
    }
  };

  const deleteNotification = e => {
    e.stopPropagation();
    onDeleteNotification(notification.id);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: goToPage,
    className: "flex items-center relative my-2 px-6 py-4 hover:bg-gray-100 cursor-pointer z-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    profile: notification.giver,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, generateText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-auto",
    onClick: deleteNotification
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__["IoIosCloseCircle"], {
    className: "text-gray-500 hover:text-gray-600 text-2xl"
  }), " ")));
};

/***/ })

};
//# sourceMappingURL=server.d0d7ac7246c72b5faf7e.hot-update.js.map