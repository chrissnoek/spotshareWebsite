exports.id = "server";
exports.modules = {

/***/ "./src/LocationDetailStrapi.jsx":
/*!**************************************!*\
  !*** ./src/LocationDetailStrapi.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocationDetailStrapi; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__);
/* globals React */

/* eslint "react/jsx-no-undef":"off" */










class LocationDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query locationBySlug($slug: String!){
            locationBySlug(slug: $slug) {
                title
                photos {
                    id
                    title
                    slug
                    photo {
                        id
                        name
                        url
                    }
                }
                desc
                slug
                id
                longitude
                latitude
            }
        }`;
    let {
      params: {
        id: slug
      }
    } = match;
    console.log(match);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      slug
    }, true);
    return result;
  }

  constructor() {
    super();
    const locationBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.locationBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      locationBySlug,
      redirect: false,
      zoom: 13,
      userLocationKnown: false,
      userMarker: null,
      userLocation: {
        longitude: null,
        latitude: null
      }
    };
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (prevId !== id) {
      this.loadData();
    }
  }

  componentDidMount() {
    const {
      locationBySlug
    } = this.state;

    if (locationBySlug === null) {
      this.loadData();
    } // loading leaflet in componentDidMount because it doenst support SSR


    const L = __webpack_require__(/*! leaflet */ "leaflet");

    const userMarker = new L.Icon({
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    }); // get users position

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      var crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      this.setState(prevState => ({ ...prevState,
        userMarker,
        userLocationKnown: true,
        userLocation: {
          longitude: crd.longitude,
          latitude: crd.latitude
        }
      }));
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      fetch('https://ipapi.co/json').then(res => res.json()).then(location => {
        this.setState(prevState => ({ ...prevState,
          userMarker,
          userLocationKnown: true,
          userLocation: {
            longitude: location.longitude,
            latitude: location.latitude
          }
        }));
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  async loadData() {
    // get the search query string form url
    const {
      match
    } = this.props; // provide the query with the variables 

    const data = await LocationDetailStrapi.fetchData(match);

    if (data.locationBySlug != null) {
      this.setState({
        locationBySlug: data.locationBySlug
      });
    } else {
      console.log('return not found');
      this.setState({
        redirect: true
      });
      console.log(this.state);
    }
  }

  render() {
    const {
      locationBySlug,
      redirect
    } = this.state;

    if (redirect) {
      console.log('redirect', redirect);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/niet-gevonden"
      });
    }

    if (locationBySlug === null) return null;
    const {
      userLocation,
      userLocationKnown,
      userMarker
    } = this.state;
    const {
      photos
    } = locationBySlug;
    const position = [locationBySlug.longitude, locationBySlug.latitude];
    const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-2xl font-bold mb-1 text-gray-800 block"
    }, locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-gray-600"
    }, locationBySlug.desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
      className: "map",
      id: "photoLocation",
      center: position,
      zoom: this.state.zoom
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: position
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Foto locatie")), userLocationKnown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: calculatedUserLocation,
      icon: userMarker
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      className: "text-xl font-bold mb-1 text-gray-800 block"
    }, "Foto's gemaakt op fotolocatie ", locationBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "-mx-2"
    }, photos.map(photoItem => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LocationPhotoItem, {
        item: photoItem,
        key: photoItem.id
      });
    }))));
  }

}

function LocationPhotoItem(props) {
  const itemPhoto = props.item.photo[0];
  const selectedLocation = `/foto/${props.item.slug}`;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full inline-block md:w-1/2 lg:w-1/3 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoCard rounded relative shadow-xs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative rounded overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
    to: selectedLocation,
    className: "absolute w-full h-full z-10",
    title: "Bekijk foto nu"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: itemPhoto.url,
    className: "object-cover  w-full h-48  block",
    alt: "Foto"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoContent p-4 absolute bottom-0 left-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "photoInfo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-white"
  }, props.item.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "clear"
  }))))));
  ;
}

/***/ })

};
//# sourceMappingURL=server.4de946f550b0c4ebf5c7.hot-update.js.map