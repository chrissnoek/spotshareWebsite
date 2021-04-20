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











const Dashboard = props => {
  const [categories, setCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();

  const getCategories = async () => {
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
    console.log(value);
    return !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
      to: "/"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block md:flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mx-auto sm:mx-0 mb-2 sm:mr-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfilePicture, {
      profile: profile
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sm:w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl leading-tight text-center sm:text-left"
    }, profile.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "flex items-center text-gray-400 text-sm text-center justify-center sm:justify-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TiLocation, null), "\xA0", profile.location)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      redirect: redirect
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4"
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
		}
	  }`;
  const vars = {};
  const {
    locationCategories: result
  } = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true);
  return result;
};

/***/ })

};
//# sourceMappingURL=server.d7325771b11da14cdd1c.hot-update.js.map