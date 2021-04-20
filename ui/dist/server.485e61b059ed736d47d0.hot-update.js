exports.id = "server";
exports.modules = {

/***/ "./src/components/LocationCards.jsx":
/*!******************************************!*\
  !*** ./src/components/LocationCards.jsx ***!
  \******************************************/
/*! exports provided: LocationHashtag, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationHashtag", function() { return LocationHashtag; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_2__);





const LocationCard = ({
  location,
  size,
  active
}) => {
  let cardClass;
  let imageClass;
  let imageStyle;

  if (!size) {
    cardClass = "w-48 h-48 mr-4 lg:w-64 lg:h-64 locationCard";
    imageClass = "w-auto h-full";
    imageStyle = {
      backgroundColor: "grey",
      transform: "translateX(-50%)",
      left: "50%"
    };
  } else {
    if (size === "large") {
      cardClass = active ? "w-full h-48 mb-4 border-4 border-red-500" : "w-full h-48 mb-4";
      imageClass = "w-full h-48 object-cover";
      imageStyle = {
        backgroundColor: "grey",
        transform: "translateY(-50%)",
        top: "50%"
      };
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `relative overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out ${cardClass}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "absolute w-full h-full top-0 left-0 z-10",
    to: `/fotolocatie/${location.slug}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: `absolute block max-w-none ${imageClass}`,
    style: imageStyle,
    src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
    alt: `Bekijk locatie ${location.title}`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute w-100 bottom-0 left-0 px-3 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-white text-sm"
  }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationHashtag, {
    key: category.id,
    category: category
  })))));
};

const LocationHashtag = ({
  category
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-400 mr-2 text-xs inline-block"
  }, "#", category.label.toLowerCase());
};
/* harmony default export */ __webpack_exports__["default"] = (LocationCard);

/***/ })

};
//# sourceMappingURL=server.485e61b059ed736d47d0.hot-update.js.map