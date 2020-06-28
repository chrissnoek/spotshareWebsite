exports.id = "server";
exports.modules = {

/***/ "./src/Register.jsx":
/*!**************************!*\
  !*** ./src/Register.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "./node_modules/@hapi/joi/lib/index.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Form_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Form.jsx */ "./src/Form.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphQLFetch.js */ "./src/graphQLFetch.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class RegisterForm extends _Form_jsx__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: ''
      },
      errors: {}
    });

    _defineProperty(this, "schema", {
      email: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().email({
        tlds: {
          allow: false
        }
      }).required().messages({
        "string.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`
      }),
      password: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je wachtwoord nog even in? 😉`,
        "any.required": `Vul je je wachtwoord nog even in? 😉`
      }),
      firstname: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je voornaam nog even in? 😉`,
        "any.required": `Vul je je voornaam nog even in? 😉`
      }),
      lastname: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().required().messages({
        "string.empty": `Vul je je achternaam nog even in? 😉`,
        "any.required": `Vul je je achternaam nog even in? 😉`
      }),
      username: _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.string().regex(/^\S*$/).required().messages({
        "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
        "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
        "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten"
      })
    });

    _defineProperty(this, "createUser", async () => {
      const query = `mutation register($input: UserInput!) {
            register(input: $input) {
              jwt
              user {
                id
                email
              }
            }
          } `;
      const {
        data
      } = this.state;
      let input = { ...data
      };
      input['role'] = '5eef1a60e3b96d29e2d1d1ac';
      console.log(input);
      const result = await Object(_graphQLFetch_js__WEBPACK_IMPORTED_MODULE_4__["default"])(query, {
        input
      }, true, true);

      if (result) {
        console.log(result);
      }
    });

    _defineProperty(this, "doSubmit", () => {
      // call server
      // redirect user to homepage
      this.createUser();
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "m-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.handleSubmit,
      className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      className: "font-bold text-xl text-green-500"
    }, "Aanmelden bij Spotshare"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex"
    }, this.renderInput('firstname', 'Voornaam', 'Voornaam', 'text', 'w-1/2 mr-2'), this.renderInput('lastname', 'Achternaam', 'Achternaam', 'text', 'w-1/2')), this.renderInput('username', 'Gebruikersnaam', 'Gebruikersnaam'), this.renderInput('email', 'Email', 'Emailadres'), this.renderInput('password', 'Wachtwoord', 'Vul je wachtwoord in', 'password'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex items-center justify-between"
    }, this.renderButton('Kom bij de club!'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["NavLink"], {
      className: "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600",
      to: "/inloggen"
    }, "Inloggen")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (RegisterForm);

/***/ })

};
//# sourceMappingURL=server.b786603675ba5b93da3d.hot-update.js.map