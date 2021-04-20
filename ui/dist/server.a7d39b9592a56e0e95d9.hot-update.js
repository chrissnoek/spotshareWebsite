exports.id = "server";
exports.modules = {

/***/ "./src/Profile.jsx":
/*!*************************!*\
  !*** ./src/Profile.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./src/store.js");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/md */ "react-icons/md");
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/ti */ "react-icons/ti");
/* harmony import */ var react_icons_ti__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_ti__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_userContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/userContext.js */ "./src/services/userContext.js");
/* harmony import */ var _PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PhotoCarousel.jsx */ "./src/PhotoCarousel.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_followButton_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/followButton.jsx */ "./src/components/followButton.jsx");
/* harmony import */ var _components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ConstructorHook.jsx */ "./src/components/ConstructorHook.jsx");
/* harmony import */ var _components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/UserProfilePicture.jsx */ "./src/components/UserProfilePicture.jsx");
/* harmony import */ var _components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/CreateNotification.jsx */ "./src/components/CreateNotification.jsx");
/* harmony import */ var _components_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/LocationCards.jsx */ "./src/components/LocationCards.jsx");
















const UserProfile = props => {
  const [profile, setProfile] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["useHistory"])();

  const getInitialProfile = async props => {
    let _profile = _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData ? _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData : null;

    delete _store_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialData;

    if (!_profile) {
      _profile = await UserProfile.fetchData(props.match);
    }

    setProfile(_profile);
  };

  const getProfile = async () => {
    const _profile = await UserProfile.fetchData(props.match);

    setProfile(_profile);
  };

  Object(_components_ConstructorHook_jsx__WEBPACK_IMPORTED_MODULE_10__["default"])(() => {
    getInitialProfile(props);
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getProfile();
  }, [props]);

  const updateFollow = async followId => {
    //console.log(followId);
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            followers {
              id
            }
          }
        }
      }`;
    let profileFollowersArray = profile.followers.map(following => following.id); //console.log("before adjusting", profileFollowersArray);

    let action; // if the id that is being followed is not already in the array, add it

    if (!profileFollowersArray.includes(followId)) {
      profileFollowersArray.push(followId);
      action = "add";
    } else if (profileFollowersArray.includes(followId)) {
      // followId is in array, so remove it from array
      const index = profileFollowersArray.indexOf(followId);

      if (index > -1) {
        profileFollowersArray.splice(index, 1);
      }

      action = "remove";
    } //console.log("after adjusting", profileFollowersArray);


    const variables = {
      input: {
        where: {
          id: profile.id
        },
        data: {
          followers: profileFollowersArray
        }
      }
    };
    let prevProfile = { ...profile
    };
    let _profile = { ...profile
    };
    let newFollowArray = profileFollowersArray.map(following => {
      return {
        id: following
      };
    });
    _profile.followers = newFollowArray;
    setProfile(_profile);
    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true, true);

    if (data) {
      if (data.errors) {
        console.log("an error happened");
        setProfile(prevProfile);
      } else {
        if (action === "add") {
          await Object(_components_CreateNotification_jsx__WEBPACK_IMPORTED_MODULE_12__["default"])(followId, profile.id, "follow");
        }
      }
    }
  };

  const deletePhoto = async index => {
    const query = `mutation photoDelete($input:deletePhotoInput) {
      deletePhoto(input: $input) {
        photo {
          id
        }
      }
    }`;
    const prevProfile = { ...profile
    };
    const {
      photos
    } = profile;
    const newList = [...photos];
    newList.splice(index, 1);
    const _profile = { ...profile
    };
    _profile.photos = newList;
    setProfile(_profile); // get the id of the photo to be deleted

    const {
      id
    } = photos[index];
    const variables = {
      input: {
        where: {
          id
        }
      }
    }; // execute the query

    const data = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, variables, true, true);

    if (data) {
      if (data.errors) {
        console.log("an error happened");
        setProfile(prevProfile);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_services_userContext_js__WEBPACK_IMPORTED_MODULE_6__["userContext"].Consumer, null, value => {
    //console.log("value", value);
    if (value.user) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfileComponent, {
        curUser: value.user,
        profile: profile,
        updateFollow: updateFollow,
        deletePhoto: deletePhoto
      });
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UserProfileComponent, {
        curUser: null,
        profile: profile,
        updateFollow: updateFollow,
        deletePhoto: deletePhoto
      });
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

UserProfile.fetchData = async (match, search, showError) => {
  console.log(match);
  const query = `query profile($slug: String!) {
          users( where: { slug: $slug } ) {
            username
            profilePicture {
              url
            }
            email
            id
            slug
            location
            followers{
              id
            }
            followings {
              id
            }
            favouriteLocations {
              id
              title
              slug
              location_categories {
                id
                label
              }
              photos {
                likes
                photo {
                  url
                  
                }
              }
            }
            photos {
              likes
              id
              title
              slug
              location {
                longitude
                latitude
                id
                title
                slug
              }
              photo {
                id
                name
                url
              }
            }
          }
        }`;
  let {
    params: {
      slug
    }
  } = match;
  const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_1__["default"])(query, {
    slug
  }, true);
  return result.users[0];
};

const UserProfileComponent = props => {
  const {
    curUser,
    profile,
    updateFollow,
    deletePhoto
  } = props;

  if (profile === null) {
    console.log("return null from render");
    return null;
  }

  const [isServer, setIsServer] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setIsServer(false);
  }, []); //console.log("curUser", props);

  const followCount = profile.followers.length;
  console.log("userProfileComponent rendered again, followCount: ", followCount, profile);
  const filterResult = curUser && profile.followers.filter(followers => followers.id === curUser.id); //console.log(filterResult);

  const followsUser = curUser ? profile.followers.filter(followers => followers.id === curUser.id).length > 0 : 0;
  let numberOfLikes = 0;

  if (profile.photos.length > 0) {
    for (let i = 0; i < profile.photos.length; i++) {
      numberOfLikes = numberOfLikes + profile.photos[i].likes;
    }
  }

  console.log(profile);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:flex sm:items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "block sm:flex sm:items-center sm:w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mx-auto sm:mx-0 mb-2 sm:mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UserProfilePicture_jsx__WEBPACK_IMPORTED_MODULE_11__["default"], {
    profile: profile
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "font-bold text-xl leading-tight text-center sm:text-left"
  }, profile.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "flex items-center text-gray-400 text-sm text-center justify-center sm:justify-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_ti__WEBPACK_IMPORTED_MODULE_5__["TiLocation"], null), "\xA0", profile.location)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "hidden sm:block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-between sm:justify-start mt-2 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, followCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, followCount === 1 ? "volger" : "volgers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, profile.followings.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "volgend")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center sm:mr-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block sm:inline-block font-bold text-sm sm:mr-1"
  }, numberOfLikes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "likes")))))), !isServer && curUser && curUser.id !== profile.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_followButton_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
    follow: followsUser,
    updateFollow: updateFollow,
    followId: curUser.id
  }), !isServer && curUser && curUser.id === profile.id && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["Link"], {
    to: `/profiel/bewerken/${profile.slug}`,
    className: "ml-auto my-1 rounded bg-blue-500 hover:bg-blue-600 text-white p-1 sm:p-3 text-xl flex justify-center items-center editProfile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_4__["MdEdit"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sm:hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex justify-between mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, followCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, followCount === 1 ? "volger" : "volgers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, profile.followings.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "volgend")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mr-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "block font-bold text-sm"
  }, numberOfLikes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-gray-500 text-sm"
  }, "likes"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "my-3"
  }, "Foto's"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
  }, profile.photos.map((photo, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PhotoCarousel_jsx__WEBPACK_IMPORTED_MODULE_7__["PhotoView"], {
    key: photo.id,
    index: index,
    deletePhoto: !isServer && curUser && curUser.id === profile.id ? deletePhoto : null,
    photo: photo
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    id: "fav",
    className: "my-3"
  }, "Favoriete locaties"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
  }, profile.favouriteLocations.map(location => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_LocationCards_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
    key: location.id,
    location: location
  })))));
};

/***/ })

};
//# sourceMappingURL=server.a7d39b9592a56e0e95d9.hot-update.js.map