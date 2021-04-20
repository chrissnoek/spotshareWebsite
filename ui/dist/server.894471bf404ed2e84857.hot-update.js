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
      className: `block py-3 flex items-center ${!showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Foto uploaden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__["IoNotifications"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Berichten"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center",
      to: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__["FiLogOut"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Uitloggen"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      redirect: redirect
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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

/***/ })

};
//# sourceMappingURL=server.894471bf404ed2e84857.hot-update.js.map