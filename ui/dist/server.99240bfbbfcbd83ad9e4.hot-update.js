exports.id = "server";
exports.modules = {

/***/ "./src/components/Dashboard/CategorieList.jsx":
/*!****************************************************!*\
  !*** ./src/components/Dashboard/CategorieList.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);




const CategorieList = ({
  categories
}) => {
  console.log(categories);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-black mb-2"
  }, "Zoek locatie op categorie"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-wrap"
  }, categories && categories.filter(categorie => categorie.value != "").map(categorie => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategorieLabel, {
    categorie: categorie,
    key: categorie.value
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (CategorieList);

const CategorieLabel = ({
  categorie: {
    label,
    value
  }
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: `/fotolocaties/categorie/${value}`,
    className: "block py-2 px-4 rounded-full mr-2 mb-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500"
  }, label);
};

/***/ }),

/***/ "./src/components/Dashboard/Dashboard.jsx":
/*!************************************************!*\
  !*** ./src/components/Dashboard/Dashboard.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Heading_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Heading.jsx */ "./src/components/Dashboard/Heading.jsx");
/* harmony import */ var _LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationsNearby.jsx */ "./src/components/Dashboard/LocationsNearby.jsx");
/* harmony import */ var _CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CategorieList.jsx */ "./src/components/Dashboard/CategorieList.jsx");
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store.js */ "./src/store.js");
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MostRecent.jsx */ "./src/components/Dashboard/MostRecent.jsx");
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-icons/io5 */ "react-icons/io5");
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__);















const Dashboard = props => {
  const [categories, setCategories] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [showNotifications, setShowNotifications] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const match = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["useRouteMatch"])();

  const getCategories = async () => {
    console.log({
      match
    });

    let _categories = _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_5__["default"].initialData;

    if (!_categories) {
      _categories = await Dashboard.fetchData();
    }

    setCategories(_categories);
  };

  Object(_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_8__["default"])(() => {
    getCategories();
  });

  const redirect = slug => {
    props.history.push(slug);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_6__["userContext"].Consumer, null, value => {
    return !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Redirect"], {
      to: "/"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "block md:flex mt-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4 px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mr-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
      profile: value.user,
      size: 10
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl leading-tight text-center sm:text-left"
    }, value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "mt-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: `block py-3 flex items-center ${!showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaHome"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Dashboard")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: `/fotograaf/${value.user.slug}#fav`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaBookmark"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Opgeslagen locaties"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center",
      to: "/foto/toevoegen"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_11__["FaPlus"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Foto uploaden"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `block py-3 flex items-center ${showNotifications ? `text-blue-500 font-bold` : `text-gray-900 hover:text-blue-500 hover:font-bold`}`,
      onClick: () => setShowNotifications(true)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io5__WEBPACK_IMPORTED_MODULE_12__["IoNotifications"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Berichten"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
      className: "block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center",
      to: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_13__["FiLogOut"], {
      className: "mr-2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Uitloggen"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/2"
    }, showNotifications ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotificationBoard, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Heading_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      redirect: redirect
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MostRecent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full md:w-1/4  px-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationsNearby_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CategorieList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      categories: categories
    }))));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Dashboard);

Dashboard.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query {
		locationCategories{
		  label
      value
      locations {
        id
      }
		}
	  }`;
  const vars = {};
  const {
    locationCategories: result
  } = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, vars, true); // only return categories with available locations

  return result.filter(cat => cat.locations.length > 0);
};

/***/ }),

/***/ "./src/components/Dashboard/Heading.jsx":
/*!**********************************************!*\
  !*** ./src/components/Dashboard/Heading.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_userContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/userContext */ "./src/services/userContext.js");
/* harmony import */ var _SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBox.jsx */ "./src/components/Dashboard/SearchBox.jsx");




const Heading = props => {
  const [greeting, setGreeting] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12) setGreeting("Goedemorgen");else if (hrs >= 12 && hrs <= 17) setGreeting("Goedemiddag");else if (hrs >= 17 && hrs <= 24) setGreeting("Goedenavond");
  }, []);

  const personalHeading = name => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-3xl mb-4"
  }, greeting, " ", name, "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Zoek je volgende ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-green-500"
  }, "fotolocatie"), "."));

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pb-8 pt-6  text-center rounded bg-gray-900 mb-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext__WEBPACK_IMPORTED_MODULE_1__["userContext"].Consumer, null, value => !value.user ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "mb-4 text-white"
  }, "De mooiste fotolocaties, gewoon bij jou in de buurt.") : personalHeading(value.user.firstname ? value.user.firstname : value.user.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchBox_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    redirect: props.redirect
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Heading);

/***/ }),

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
      className: `overflow-hidden relative rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out mb-4`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"], {
      className: "absolute w-full h-full top-0 left-0 z-10",
      to: `/fotolocatie/${location.slug}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: `block max-w-none w-20 h-20 object-cover mr-4`,
      src: location.photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url.replace(/-original|-watermark/gi, "-small"),
      alt: `Bekijk locatie ${location.title}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "text-black text-sm"
    }, location.title), location.location_categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_2__["LocationHashtag"], {
      key: category.id,
      category: category
    })))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (LocationsNearby);

/***/ }),

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
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Meest Recent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
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

/***/ }),

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

/***/ }),

/***/ "./src/components/Dashboard/SocialCard.jsx":
/*!*************************************************!*\
  !*** ./src/components/Dashboard/SocialCard.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cool-img */ "react-cool-img");
/* harmony import */ var react_cool_img__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cool_img__WEBPACK_IMPORTED_MODULE_2__);




const SocialCard = ({
  photo
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center my-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mr-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
    profile: photo.user,
    size: 8
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "font-bold"
  }, photo.user && photo.user.firstname, " ", photo.user && photo.user.lastname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-xs text-gray-500"
  }, photo.createdAt.toLocaleString()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_cool_img__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: `rounded block max-w-none w-full h-64 object-cover`,
    style: {
      backgroundColor: "grey",
      width: "480",
      height: "320"
    },
    src: photo.photo[0].url.replace(/-original|-watermark|-thumbnail/gi, "-small"),
    alt: photo.title
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (SocialCard);

/***/ }),

/***/ "swiper/react":
/*!*******************************!*\
  !*** external "swiper/react" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper/react");

/***/ })

};
//# sourceMappingURL=server.99240bfbbfcbd83ad9e4.hot-update.js.map