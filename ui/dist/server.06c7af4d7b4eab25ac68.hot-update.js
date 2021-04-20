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
        const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(location.longitude, location.longitude);

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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      location: location,
      key: location.id
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsNearby);

/***/ })

};
//# sourceMappingURL=server.06c7af4d7b4eab25ac68.hot-update.js.map