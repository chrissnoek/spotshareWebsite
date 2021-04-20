exports.id = "server";
exports.modules = {

/***/ "./src/components/Results/LocationList.jsx":
/*!*************************************************!*\
  !*** ./src/components/Results/LocationList.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationCards_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../LocationCards.jsx */ "./src/components/LocationCards.jsx");





const LocationList = ({
  location,
  active,
  selectLocation
}) => {
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
  let cardClass = active ? "w-full mb-1 border-2 border-green-500" : "w-full mb-1 border-2 border-white";

  const goToLocation = (slug, id) => {
    let data = [];

    if (sessionStorage.getItem("visitedLocations")) {
      data = JSON.parse(sessionStorage.getItem("visitedLocations"));
    }

    if (data.indexOf(id) === -1) {
      data.push(id);
    }

    sessionStorage.setItem("visitedLocations", JSON.stringify(data));
    history.push(`/fotolocatie/${slug}`);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onMouseOver: () => {
      selectLocation(location.id);
    },
    onMouseOut: () => {
      selectLocation("");
    },
    className: `relative shadow hover:shadow-lg transition ease-in-out rounded ${cardClass}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center p-1",
    onClick: () => {
      goToLocation(location.slug, location.id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: `rounded block max-w-none w-20 h-16 object-cover`,
    style: {
      backgroundColor: "grey"
    },
    src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
    alt: `Bekijk locatie ${location.title}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-5 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-black text-lg"
  }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_3__["LocationHashtag"], {
    key: category.id,
    category: category
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationList);

/***/ })

};
//# sourceMappingURL=server.21580495c3d512007166.hot-update.js.map