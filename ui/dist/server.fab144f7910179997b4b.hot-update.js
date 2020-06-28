exports.id = "server";
exports.modules = {

/***/ "./src/graphQLFetch.js":
/*!*****************************!*\
  !*** ./src/graphQLFetch.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return graphQLFetch; });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-toastify */ "react-toastify");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch");
/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1__);


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}, isBlog = false, returnError = false) {
  //console.log('query from graphQlFetch ' + query)
  let apiEndpoint =  false ? // eslint-disable-line no-undef
  undefined : process.env.UI_SERVER_API_ENDPOINT;
  apiEndpoint = isBlog ? 'http://localhost:1337/graphql' : apiEndpoint;

  try {
    const response = await isomorphic_fetch__WEBPACK_IMPORTED_MODULE_1___default()(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver); // alert the error message whenthe result is containing erros

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code == "BAD_USER_INPUT") {
        console.log(error);
        const details = error.extensions.exception.errors.join("\n ");
        react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`${error.message}\n ${details}`);
        if (returnError) return result;
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`${error.extensions.code}\n ${error.message}`);
        if (returnError) return result;
      }
    }

    return result.data;
  } catch (e) {
    react_toastify__WEBPACK_IMPORTED_MODULE_0__["toast"].error(`Error in sending data to server: ${e.message}`);
  }
}

/***/ })

};
//# sourceMappingURL=server.fab144f7910179997b4b.hot-update.js.map