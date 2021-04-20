exports.id = "server";
exports.modules = {

/***/ "./src/components/Results/Results.jsx":
/*!********************************************!*\
  !*** ./src/components/Results/Results.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResultMap.jsx */ "./src/components/Results/ResultMap.jsx");
/* harmony import */ var _CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CategorieFilter.jsx */ "./src/components/Results/CategorieFilter.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LocationList.jsx */ "./src/components/Results/LocationList.jsx");


/* to support IE */








const Results = props => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [filteredLocations, setFilteredLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const [activeFilter, setActiveFilter] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  const [selectedLocation, setSelectedLocation] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showMap, setShowMap] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useHistory"])();
  let location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["useLocation"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    !locations && getLocations();

    const _activeFilter = getActiveFilter();

    if (locations) {
      const _filteredLocations = locations.filter(location => {
        const include = location.location_categories.filter(categorie => {
          if (categorie.id === _activeFilter) {
            return true;
          } else {
            return false;
          }
        }); //console.log(location.id, include);

        if (include.length > 0) return true;
      });

      setFilteredLocations(_filteredLocations);
    } //console.log(_filteredLocations);

  }, [location]);

  const getLocations = async () => {
    let _locations = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    console.log(_store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData, _locations);
    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_locations) {
      console.log("getting locations");
      _locations = await Results.fetchData(null, location.search);
    }

    setLocations(_locations.filter(location => location.photos.length > 0));
    console.log(_locations);
  };

  const getActiveFilter = () => {
    const params = new URLSearchParams(location.search);

    const _activeFilter = params.get("categorie") ? params.get("categorie") : "";

    if (_activeFilter) {
      return _activeFilter;
    } else {
      return false;
    }
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])(() => {
    const _activeFilter = getActiveFilter();

    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    }

    getLocations();
    setShowMap(true);
  });

  const onFilterChange = (e, reset) => {
    const params = new URLSearchParams(location.search);
    const vars = {};
    if (params.get("lat")) vars.lat = params.get("lat");
    if (params.get("lng")) vars.lng = params.get("lng");
    let url = "";

    if (reset) {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}`;
    } else {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}&categorie=${e.target.value}`;
    }

    history.push(url);
  };

  const selectLocation = locationId => {
    setSelectedLocation(locationId);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative h-screen"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full p-4 h-screen overflow-scroll"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Resultaten"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-2 flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "mr-2"
  }, "Filter op categorie:"), locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeFilter,
    onFilterChange: onFilterChange,
    categories: filteredLocations.map(location => {
      return location.location_categories;
    })
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    active: activeFilter,
    onFilterChange: onFilterChange,
    categories: locations.map(location => {
      return location.location_categories;
    })
  }))), locations && (filteredLocations.length > 0 ? filteredLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))) : locations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationList_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-10 w-full h-full"
  }, showMap && locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: filteredLocations,
    selectLocation: selectLocation,
    active: selectedLocation
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: locations,
    selectLocation: selectLocation,
    active: selectedLocation
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Results);

Results.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility
  const params = new URLSearchParams(search);
  console.log("fetching data");
  const vars = {};
  if (params.get("lat")) vars.lat = params.get("lat");
  if (params.get("lng")) vars.lng = params.get("lng"); //vars.cat = params.get("categorie") ? params.get("categorie") : "";

  console.log(vars);

  const _locations = await Object(_FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__["findNearbyLocations"])(vars.lat, vars.lng);

  console.log(_locations);
  return _locations;
};

/***/ })

};
//# sourceMappingURL=server.8122a18c20c1ab97db88.hot-update.js.map