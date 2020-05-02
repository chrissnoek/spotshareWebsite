exports.id = "server";
exports.modules = {

/***/ "./src/PhotoList.jsx":
/*!***************************!*\
  !*** ./src/PhotoList.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhotoList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PhotoFilter_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoFilter.jsx */ "./src/PhotoFilter.jsx");
/* harmony import */ var _PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoCarousel.jsx */ "./src/PhotoCarousel.jsx");
/* harmony import */ var _PhotoDetail_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PhotoDetail.jsx */ "./src/PhotoDetail.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url-search-params */ "url-search-params");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* globals React */

/* eslint "react/jsx-no-undef":"off" */






/* to support IE */



class PhotoList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  static async fetchData(match, search) {
    // get the search query string form url
    //const { location: { search } } = this.props;
    // use URLSearchParams for IE Compatibility
    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_6___default.a(search); // If category is provided in the query string, add them to our variables 

    const vars = {};
    if (params.get('category')) vars.category = params.get('category'); // build the graphql query

    const query = `query photoList($category: String) {
        photoList(category: $category) {
          id
          title
          date
          created
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`; // provide the query with the variables 

    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars);
    return data;
  }

  constructor() {
    const _photos = _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData.photoList : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_7__["default"].initialData;
    super();

    _defineProperty(this, "deletePhoto", async index => {
      const query = `mutation photoDelete($id: Int!) {
            photoDelete(id: $id)
        }`;
      const {
        photos
      } = this.state;
      const {
        location: {
          pathname,
          search
        },
        history
      } = this.props;
      const {
        id
      } = photos[index];
      const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
        id
      });

      if (data && data.photoDelete) {
        this.setState(prevState => {
          const newList = [...prevState.photos];

          if (pathname === `/photos/${id}`) {
            history.push({
              pathname: '/photos',
              search
            });
          }

          newList.splice(index, 1);
          return {
            photos: newList
          };
        });
      } else {
        this.loadData();
      }
    });

    this.state = {
      photos: _photos
    };
  }

  componentDidUpdate(prevProps) {
    const {
      location: {
        search: prevSearch
      }
    } = prevProps;
    const {
      location: {
        search
      }
    } = this.props;

    if (prevSearch !== search) {
      this.loadData();
    }
  }

  componentDidMount() {
    const photos = this.state;
    if (photos === null) this.loadData();
  }

  async loadData() {
    // get the search query string form url
    const {
      location: {
        search
      }
    } = this.props; // fetch data

    const data = await PhotoList.fetchData(null, search);

    if (data) {
      this.setState({
        photos: data.photoList
      });
    }
  }

  render() {
    const {
      match
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "page",
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Recente foto's"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoFilter_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      photos: this.state.photos,
      deletePhoto: this.deletePhoto
    }));
  }

}

/***/ })

};
//# sourceMappingURL=server.63a895bf8a1462f3579b.hot-update.js.map