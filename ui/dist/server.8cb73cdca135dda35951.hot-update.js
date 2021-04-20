exports.id = "server";
exports.modules = {

/***/ "./src/components/CategorySearch/LocationsPerCategorie.jsx":
/*!*****************************************************************!*\
  !*** ./src/components/CategorySearch/LocationsPerCategorie.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FindNearbyLocations_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FindNearbyLocations.jsx */ "./src/components/FindNearbyLocations.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Results/ResultMap.jsx */ "./src/components/Results/ResultMap.jsx");
/* harmony import */ var _Results_CategorieFilter_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Results/CategorieFilter.jsx */ "./src/components/Results/CategorieFilter.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Results/LocationList.jsx */ "./src/components/Results/LocationList.jsx");


/* to support IE */









const LocationsPerCategorie = props => {
  const [locations, setLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [filteredLocations, setFilteredLocations] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
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
      _locations = await LocationsPerCategorie.fetchData(props.match, location.search);
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

  const selectLocation = locationId => {
    setSelectedLocation(locationId);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative h-screen"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full p-4 h-screen overflow-scroll"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Resultaten"), locations && (filteredLocations.length > 0 ? filteredLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))) : locations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: location.id,
    className: "w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_LocationList_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    size: "large",
    location: location,
    key: location.id,
    active: selectedLocation === location.id ? true : false,
    selectLocation: selectLocation
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-10 w-full h-full"
  }, showMap && locations && (filteredLocations.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: filteredLocations,
    selectLocation: selectLocation,
    active: selectedLocation
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Results_ResultMap_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    locations: locations,
    selectLocation: selectLocation,
    active: selectedLocation
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsPerCategorie);

LocationsPerCategorie.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility
  console.log(match);
  let {
    params: {
      value
    }
  } = match;
  console.log(value);
  const query = `query locationCategorie($value:String!){
    locationCategories(where:{value: $value}) {
      label
    value
    locations {
      id
      title
      longitude
      latitude
      slug
      location_categories {
        label
        value
        locations {
          title
        }
      }
      photos {
            id
            likes
            title
            slug
            photo {
                url 
            }
        }
    }
  }
  }`;
  const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_7__["default"])(query, {
    value
  }, true);

  if (data) {
    console.log(data.locationCategories[0].locations);
  }

  return data.locationCategories[0].locations; // const params = new URLSearchParams(search);
  // console.log("fetching data");
  // const vars = {};
  // if (params.get("lat")) vars.lat = params.get("lat");
  // if (params.get("lng")) vars.lng = params.get("lng");
  // //vars.cat = params.get("categorie") ? params.get("categorie") : "";
  // console.log(vars);
  // const _locations = await findNearbyLocations(vars.lat, vars.lng);
  // console.log(_locations);
  // return _locations;
};

/***/ }),

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
  }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationHashtag, {
    key: category.id,
    category: category
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationList);

/***/ })

};
//# sourceMappingURL=server.8cb73cdca135dda35951.hot-update.js.map