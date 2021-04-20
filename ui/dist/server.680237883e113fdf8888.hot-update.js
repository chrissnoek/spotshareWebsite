exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/CategorieList.jsx":
/*!****************************************************!*\
  !*** ./src/components/Dashboard/CategorieList.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);




const CategorieList = ({
  categories
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-black mb-2"
  }, "Zoek locatie op categorie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap"
  }, categories && categories.filter(categorie => categorie.value != "").map(categorie => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategorieLabel, {
    categorie: categorie,
    key: categorie.value
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (CategorieList);

const CategorieLabel = ({
  categorie: {
    label,
    value
  }
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: `/fotolocaties/categorie/${value}`,
    className: "block py-2 px-4 rounded-full mr-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500"
  }, label);
};

/***/ })

};
//# sourceMappingURL=server.680237883e113fdf8888.hot-update.js.map