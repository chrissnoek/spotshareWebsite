exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/MostRecent.jsx":
/*!*************************************************!*\
  !*** ./src/components/Dashboard/MostRecent.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _SocialCard_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SocialCard.jsx */ "./src/components/Dashboard/SocialCard.jsx");






const MostRecent = () => {
  const [recentPhotos, setRecentPhotos] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();

  const getMostRecent = async () => {
    let _recentPhotos = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_recentPhotos) {
      _recentPhotos = await MostRecent.fetchData();
    }

    setRecentPhotos(_recentPhotos);
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_1__["default"])(() => {
    getMostRecent();
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container px-6 py-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Meest Recent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-3 grid-rows-2 gap-4"
  }, recentPhotos && recentPhotos.photos.map(photo => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SocialCard_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: photo.id,
      photo: photo
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (MostRecent);

MostRecent.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query recentPhotos{
    photos(limit: 6, sort:"createdAt:desc") {
createdAt
      title
      desc
      photo {
          url
      }

      comments {
        body
        user {
          profilePicture {
            url
          }
          slug
          username 
        }
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
usersLike {
id
}
      location {
          longitude
          latitude
          id
          title
          slug
      }
      user {
        id
        slug
        username
        firstname
        lastname
        profilePicture {
            url
          }
      }
    }
  }`;
  const vars = {};
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_3__["default"])(query, vars, true);
  return result;
};

/***/ })

};
//# sourceMappingURL=server.0ebbb6a3aba62a1acf8b.hot-update.js.map