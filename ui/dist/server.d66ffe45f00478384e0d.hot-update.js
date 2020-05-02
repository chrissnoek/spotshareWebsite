exports.id = "server";
exports.modules = {

/***/ "./src/PhotoDetail.jsx":
/*!*****************************!*\
  !*** ./src/PhotoDetail.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-leaflet-universal */ "react-leaflet-universal");
/* harmony import */ var react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* globals React */

/* eslint "react/jsx-no-undef":"off" */





class PhotoDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search, showError) {
    // build the graphql query
    const query = `query photo($id: Int!) {
        photo(id: $id) {
          id
          title
          date
          created
          description
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;
    let {
      params: {
        id
      }
    } = match;
    id = parseInt(id);
    const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
      id
    }, showError);
    return result;
  }

  constructor() {
    super();
    console.log(_store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData);
    const photo = _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData.photo : null;
    delete _store_js__WEBPACK_IMPORTED_MODULE_4__["default"].initialData;
    this.state = {
      photo,
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
    console.log(this.state);
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
      photo
    } = this.state;

    if (photo === null) {
      this.loadData();
    }
  }

  async loadData() {
    // get the search query string form url
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props; // provide the query with the variables 

    const data = await PhotoDetail.fetchData(query, {
      id
    });

    if (data) {
      this.setState({
        photo: data.photo
      });
    }
  }

  render() {
    const {
      photo
    } = this.state;
    if (photo === null) return null;
    const {
      photo: {
        images: {
          imageWatermark
        }
      }
    } = this.state;
    const position = [this.state.lat, this.state.lng];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, photo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, photo.description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
      to: `/edit/${photo.id}`
    }, "Bewerken"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: imageWatermark,
      className: " w-full   block",
      alt: "Foto"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Map"], {
      className: "map",
      center: position,
      zoom: this.state.zoom
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["TileLayer"], {
      attribution: "&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
      position: position
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_leaflet_universal__WEBPACK_IMPORTED_MODULE_2__["Popup"], null, "A pretty CSS3 popup. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " Easily customizable."))));
  }

}

/***/ })

};
//# sourceMappingURL=server.d66ffe45f00478384e0d.hot-update.js.map