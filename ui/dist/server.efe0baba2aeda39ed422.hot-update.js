exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/SearchBox.jsx":
/*!************************************************!*\
  !*** ./src/components/Dashboard/SearchBox.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/ti */ "react-icons/ti");
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_ti__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);






const SearchBox = props => {
  const [showDropdown, setShowDropdown] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [formValue, setFormValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("");
  let history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();

  const handleDropdown = focussed => {
    setShowDropdown(focussed);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submiteed");
    console.log(formValue);
    const urlValue = formValue.trim().replace(/\s/g, "%20");
    const url = `https://nominatim.openstreetmap.org/search/${urlValue}?format=json&addressdetails=1&limit=1`;
    const response = await fetch(url);
    console.log(response);

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json(); //console.log(json);
      //

      if (json.length > 0) {
        // the entered city can be converted to lat long
        sessionStorage.getItem("prevsettings") && sessionStorage.removeItem("prevsettings");
        props.redirect(`/fotolocaties/resultaten/?lat=${json[0].lat}&lng=${json[0].lon}`);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].error("Het lijkt erop dat je geen geldige locatie hebt ingevuld :-(");
      }
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const handleChange = e => {
    setFormValue(e.target.value);
  };

  const searchCurLoc = () => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = async pos => {
      var crd = pos.coords;
      sessionStorage.getItem("prevsettings") && sessionStorage.removeItem("prevsettings");
      props.redirect(`/fotolocaties/resultaten/?lat=${crd.latitude}&lng=${crd.longitude}`);
    };

    const error = async err => {
      fetch("https://ipapi.co/json").then(res => res.json()).then(async location => {
        props.redirect(`/fotolocaties/resultaten/?lat=${location.latitude}&lng=${location.longitude}`);
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "searchBox max-w-md mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    action: "/fotolocaties/resultaten/",
    method: "get",
    id: "search-locations",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    name: "lat",
    id: "lat"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "hidden",
    name: "lng",
    id: "lng"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "rounded border border-gray-300 px-4 py-2 w-full top-0 left-0 focus:rounded-t",
    type: "search",
    placeholder: "Locatie zoeken",
    onFocus: () => {
      handleDropdown(true);
    },
    onBlur: () => {
      setTimeout(() => {
        handleDropdown(false);
      }, 1000);
    },
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_1__["FaSearch"], {
    className: "absolute top-0 right-0 m-3 fill-current text-gray-500"
  })), showDropdown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dropdown bg-white rounded-b border absolute w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-center items-center px-4 py-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ti__WEBPACK_IMPORTED_MODULE_2__["TiLocationArrow"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    onClick: searchCurLoc
  }, "Gebruik huidige locatie"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (SearchBox);

/***/ })

};
//# sourceMappingURL=server.efe0baba2aeda39ed422.hot-update.js.map