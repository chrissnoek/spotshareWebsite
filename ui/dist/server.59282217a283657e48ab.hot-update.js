exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/LocationsNearby.jsx":
/*!******************************************************!*\
  !*** ./src/components/Dashboard/LocationsNearby.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LocationCards.jsx */ "./src/components/LocationCards.jsx");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_5__);


 // Import Swiper React components





const LocationsNearby = () => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchData();
  }, []);

  const fetchData = async (match, search, showError) => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async pos => {
      console.log("succes");
      var crd = pos.coords;

      const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(crd.latitude, crd.longitude);

      setLocations(_locations);
    };

    const error = async err => {
      console.log("err");
      fetch("https://ipapi.co/json").then(res => res.json()).then(async location => {
        const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(location.latitude, location.longitude);

        console.log(location, _locations);
        setLocations(_locations);
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-black mb-4"
  }, "Locaties in de buurt"), locations && locations.map(location => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: location.id,
      className: `relative rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out mb-2 flex items-center`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      className: "absolute w-full h-full top-0 left-0 z-10",
      to: `/fotolocatie/${location.slug}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: `block max-w-none w-20 h-20 object-cover mr-4`,
      src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
      alt: `Bekijk locatie ${location.title}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "text-black text-sm"
    }, location.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__["LocationHashtag"], {
      key: category.id,
      category: category
    })))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsNearby);

/***/ })

};
//# sourceMappingURL=server.59282217a283657e48ab.hot-update.js.map