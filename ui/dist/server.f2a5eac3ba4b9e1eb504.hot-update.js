exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/Dashboard.jsx":
/*!************************************************!*\
  !*** ./src/components/Dashboard/Dashboard.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Heading_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Heading.jsx */ "./src/components/Dashboard/Heading.jsx");
/* harmony import */ var _LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationsNearby.jsx */ "./src/components/Dashboard/LocationsNearby.jsx");
/* harmony import */ var _CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategorieList.jsx */ "./src/components/Dashboard/CategorieList.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MostRecent.jsx */ "./src/components/Dashboard/MostRecent.jsx");
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _NotificationBoard_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./NotificationBoard.jsx */ "./src/components/Dashboard/NotificationBoard.jsx");
















const Dashboard = props => {
  const [categories, setCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showNotifications, setShowNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["useRouteMatch"])();

  const getCategories = async () => {
    console.log({
      match
    });

    let _categories = _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData;

    if (!_categories) {
      _categories = await Dashboard.fetchData();
    }

    setCategories(_categories);
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__["default"])(() => {
    getCategories();
  });

  const redirect = slug => {
    props.history.push(slug);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_6__["userContext"].Consumer, null, value => {
    return !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
      to: "/"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block md:flex mt-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4 px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
      profile: value.user,
      size: 10
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl leading-tight text-center sm:text-left"
    }, value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "mt-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: `block py-3 flex items-center ${!showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaHome"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Dashboard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: `/fotograaf/${value.user.slug}#fav`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaBookmark"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Opgeslagen locaties"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: "/foto/toevoegen"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaPlus"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Foto uploaden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `block py-3 flex items-center ${showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__["IoNotifications"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Berichten"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center",
      to: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__["FiLogOut"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Uitloggen"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/2"
    }, showNotifications ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationBoard_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], {
      user: value.user
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      redirect: redirect
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4  px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      categories: categories
    }))));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Dashboard);

Dashboard.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query {
		locationCategories{
		  label
      value
      locations {
        id
      }
		}
	  }`;
  const vars = {};
  const {
    locationCategories: result
  } = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true); // only return categories with available locations

  return result.filter(cat => cat.locations.length > 0);
};

/***/ }),

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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, notifications && notifications.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "rounded-full bg-red-500 text-white absolute top-0 -mt-1 right-0 -mr-1 text-xs w-5 h-5 flex items-center justify-center"
  }, notifications.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute bg-white rounded py-6 border z-20 right-0 shadow-lg",
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
//# sourceMappingURL=server.f2a5eac3ba4b9e1eb504.hot-update.js.map