exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/Heading.jsx":
/*!**********************************************!*\
  !*** ./src/components/Dashboard/Heading.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_userContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/userContext */ "./src/services/userContext.js");
/* harmony import */ var _SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBox.jsx */ "./src/components/Dashboard/SearchBox.jsx");




const Heading = props => {
  const [greeting, setGreeting] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12) setGreeting("Goedemorgen");else if (hrs >= 12 && hrs <= 17) setGreeting("Goedemiddag");else if (hrs >= 17 && hrs <= 24) setGreeting("Goedenavond");
  }, []);

  const personalHeading = name => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-3xl mb-4"
  }, greeting, " ", name, "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Zoek je volgende ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-green-500"
  }, "fotolocatie"), "."));

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb-8 pt-6  text-center rounded bg-gray-900"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext__WEBPACK_IMPORTED_MODULE_1__["userContext"].Consumer, null, value => !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, "De mooiste fotolocaties, gewoon bij jou in de buurt.") : personalHeading(value.user.firstname ? value.user.firstname : value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    redirect: props.redirect
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Heading);

/***/ })

};
//# sourceMappingURL=server.f277b20a2b5dfa6a3792.hot-update.js.map