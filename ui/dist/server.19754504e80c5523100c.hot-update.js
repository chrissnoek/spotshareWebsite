exports.id = "server";
exports.modules = {

/***/ "./src/Form.jsx":
/*!**********************!*\
  !*** ./src/Form.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hapi/joi */ "./node_modules/@hapi/joi/lib/index.js");
/* harmony import */ var _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hapi_joi__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Input_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input.jsx */ "./src/Input.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Form extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      data: {},
      errors: {}
    });

    _defineProperty(this, "handleChange", ({
      currentTarget: input
    }) => {
      const errors = { ...this.state.errors
      };
      const errorMessage = this.validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;else delete errors[input.name];
      const data = { ...this.state.data
      };
      data[input.name] = input.value;
      this.setState({
        data,
        errors
      });
    });

    _defineProperty(this, "validate", () => {
      const options = {
        abortEarly: false
      };
      const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({ ...this.schema
      });
      const {
        error
      } = schema.validate(this.state.data, options);
      if (!error) return null;
      const errors = {};

      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }

      return errors;
    });

    _defineProperty(this, "validateProperty", ({
      name,
      value
    }) => {
      const object = {
        [name]: value
      };
      const schema = _hapi_joi__WEBPACK_IMPORTED_MODULE_1___default.a.object({
        [name]: this.schema[name]
      });
      const result = schema.validate(object);
      console.log(result);
      const error = result.error;
      console.log('returning', error);
      return error ? error.details[0].message : null;
    });

    _defineProperty(this, "handleSubmit", e => {
      e.preventDefault();
      const errors = this.validate();
      this.setState({
        errors: errors || {}
      });
      if (errors) return;
      this.doSubmit();
    });
  }

  renderButton(label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "text-white font-bold py-2 px-4 rounded" + (this.validate() ? " bg-gray-500 hover:bg-gray-600" : " bg-blue-500 hover:bg-blue-600"),
      type: "submit",
      disabled: this.validate()
    }, label);
  }

  renderInput(name, label, placeholder, type = 'text', classes = 'w-full') {
    const {
      data,
      errors
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Input_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      classes: classes,
      name: name,
      label: label,
      value: data[name],
      onChange: this.handleChange,
      placeholder: placeholder,
      error: errors[name],
      type: type
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ })

};
//# sourceMappingURL=server.19754504e80c5523100c.hot-update.js.map