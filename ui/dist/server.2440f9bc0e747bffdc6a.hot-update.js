exports.id = "server";
exports.modules = {

/***/ "./src/PhotoCarousel.jsx":
/*!*******************************!*\
  !*** ./src/PhotoCarousel.jsx ***!
  \*******************************/
/*! exports provided: PhotoView, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoView", function() { return PhotoView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoCarousel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_cg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/cg */ "react-icons/cg");
/* harmony import */ var react_icons_cg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_cg__WEBPACK_IMPORTED_MODULE_2__);
/* globals React */



const PhotoView = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(({
  photo,
  location: {
    search
  },
  deletePhoto,
  index
}) => {
  const selectedLocation = {
    pathname: `/foto/${photo.slug}`,
    search
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full inline-block my-2 mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoCard rounded relative shadow-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative rounded overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: selectedLocation,
    className: "absolute w-full h-full z-10",
    title: "Bekijk foto nu"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: photo.photo[0].url,
    className: "object-cover  w-full h-48  block",
    alt: "Foto"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoContent pt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-black"
  }, // convert date type to a readable date string
  photo.date && photo.date.toDateString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoInfo flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-black"
  }, photo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-black"
  }, photo.location.title)), deletePhoto != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: deletePhoto != null && (() => {
      if (window.confirm("Weet je zeker dat je deze foto wilt verwijderen?")) deletePhoto(index);
    }),
    className: "rounded w-8 h-8 bg-red-700 ml-auto flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_cg__WEBPACK_IMPORTED_MODULE_2__["CgTrash"], {
    className: "w-4 h-4 stroke-current text-white"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear"
  }))));
});
function PhotoCarousel({
  photos,
  deletePhoto
}) {
  const photoViews = photos.map((photo, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PhotoView, {
    key: photo.id,
    index: index,
    deletePhoto: deletePhoto,
    photo: photo
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "-mx-2"
  }, photoViews);
}

/***/ })

};
//# sourceMappingURL=server.2440f9bc0e747bffdc6a.hot-update.js.map