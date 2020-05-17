exports.id = "server";
exports.modules = {

/***/ "./src/PhotoDetailStrapi.jsx":
/*!***********************************!*\
  !*** ./src/PhotoDetailStrapi.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoDetailStrapi; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/userMarker.svg */ "./src/images/userMarker.svg");
/* harmony import */ var _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/locationMarker.svg */ "./src/images/locationMarker.svg");
/* harmony import */ var _images_markerShadow_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/markerShadow.png */ "./src/images/markerShadow.png");
/* globals React */

/* eslint "react/jsx-no-undef":"off" */









class PhotoDetailStrapi extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
                desc
                photo {
                    url
                }
                slug
                date
                brand
                shutterspeed
                iso
                aperture
                camera
                likes
                focalLength
                location {
                    longitude
                    latitude
                }
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
    const photoBySlug = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.photoBySlug : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      photoBySlug,
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
      photoBySlug
    } = this.state;

    if (photoBySlug === null) {
      this.loadData();
    } // loading leaflet in componentDidMount because it doenst support SSR


    const L = __webpack_require__(/*! leaflet */ "leaflet");

    const userMarker = new L.Icon({
      iconUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconRetinaUrl: _images_userMarker_svg__WEBPACK_IMPORTED_MODULE_5__["default"],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: __webpack_require__(/*! leaflet/dist/images/marker-shadow.png */ "leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40)
    });
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
      iconRetinaUrl: _images_locationMarker_svg__WEBPACK_IMPORTED_MODULE_6__["default"],
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

    const data = await PhotoDetailStrapi.fetchData(match);

    if (data.photoBySlug != null) {
      console.log('Setting state');
      this.setState({
        photoBySlug: data.photoBySlug
      });
      console.log(this.state);
    } else {
      console.log('return not found');
      this.setState({
        redirect: true
      });
    }
  }

  render() {
    const {
      photoBySlug,
      redirect
    } = this.state;
    if (photoBySlug === null) return null;
    if (redirect) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
      to: "/niet-gevonden"
    });
    const {
      userLocation,
      userLocationKnown,
      userMarker
    } = this.state;
    const position = [photoBySlug.location.longitude, photoBySlug.location.latitude];
    const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: photoBySlug.photo[0].url,
      className: " w-full   block",
      alt: "Foto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "photoInfo",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "text-2xl font-bold mb-1 text-gray-800 block"
    }, photoBySlug.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-gray-600"
    }, photoBySlug.desc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "Jouw locatie")))));
  }

}

/***/ })

};
//# sourceMappingURL=server.d3c30423324840a3f874.hot-update.js.map