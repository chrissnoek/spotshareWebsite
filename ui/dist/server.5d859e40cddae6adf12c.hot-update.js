exports.id = "server";
exports.modules = {

/***/ "./server/render.jsx":
/*!***************************!*\
  !*** ./server/render.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/Page.jsx */ "./src/Page.jsx");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template.js */ "./server/template.js");
/* harmony import */ var _src_store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/store.js */ "./src/store.js");
/* harmony import */ var _src_routes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/routes.js */ "./src/routes.js");








async function render(req, res) {
  // to find the component that is being rendered (activeRoute)
  // we use matchPatch from RRD to return the correct route
  // which matches our current url (req.path)
  const activeRoute = _src_routes_js__WEBPACK_IMPORTED_MODULE_6__["default"].find(route => Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, route));
  let initialData;

  if (activeRoute && activeRoute.component.fetchData) {
    // get the this.props.match to find the /edit/2 id from url, and send with fetchData function
    const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["matchPath"])(req.path, activeRoute); // get the index search query of the url

    const index = req.url.indexOf('?'); // index -1 is given when there is no ? sign

    const search = index !== -1 ? req.url.substr(index) : null;
    initialData = await activeRoute.component.fetchData(match);
  }

  _src_store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData = initialData;
  const element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["StaticRouter"], {
    location: req.url,
    context: {}
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  const body = react_dom_server__WEBPACK_IMPORTED_MODULE_1___default.a.renderToString(element);
  res.send(Object(_template_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body, initialData));
}

/* harmony default export */ __webpack_exports__["default"] = (render);

/***/ })

};
//# sourceMappingURL=server.5d859e40cddae6adf12c.hot-update.js.map