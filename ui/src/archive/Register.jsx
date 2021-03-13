import React from "react";
import Joi from "@hapi/joi";
import Form from "./Form.jsx";
import { NavLink } from "react-router-dom";
import auth from "./services/authService";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import slugify from "slugify";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`,
        "any.invalid": `Dit email adres is al ingebruik.`,
      }),
    password: Joi.string().required().messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉`,
      "any.required": `Vul je je wachtwoord nog even in? 😉`,
    }),
    firstname: Joi.string().required().messages({
      "string.empty": `Vul je je voornaam nog even in? 😉`,
      "any.required": `Vul je je voornaam nog even in? 😉`,
    }),
    lastname: Joi.string().required().messages({
      "string.empty": `Vul je je achternaam nog even in? 😉`,
      "any.required": `Vul je je achternaam nog even in? 😉`,
    }),
    username: Joi.string().regex(/^\S*$/).required().messages({
      "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
      "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
      "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten",
    }),
  };

  createUser = async () => {
    const { data } = this.state;

    let input = { ...data };
    input["role"] = "5eef1a60e3b96d29e2d1d1ac";

    // check if slug is available, if not, add number
    input["slug"] = slugify(input.username, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const registered = await auth.register(input);

    if (registered === true) {
      window.location = "/";
    } else {
      console.log(registered);
      //toast.error("Email adres is al in gebruik");
    }
  };

  doSubmit = () => {
    // call server

    // redirect user to homepage
    this.createUser();
  };

  onInputBlur = async (type) => {
    // get the email entered
    const value = this.state.data[type];

    // do a query to db to check if email is available
    let valueObj = {};
    valueObj[type] = value;
    const available = await auth.checkAvailability(type, valueObj);

    // if email already exists, add error to email
    if (!available) {
      const errors = { ...this.state.errors };
      const errorMessage = `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } is al in gebruik.`;
      errors[type] = errorMessage;

      this.setState({ errors });

      // else, email doesnt exists, validate property if there is a correct email and set errors if they exist
    } else {
      const errors = { ...this.state.errors };
      const errorMessage = this.validateProperty({
        name: type,
        value: value,
      });
      if (errorMessage) errors[type] = errorMessage;
      else delete errors[type];

      this.setState({ errors });
    }
  };

  responseFacebook = async (response) => {
    console.log(response);
    const ACT = response.accessToken;
    console.log(ACT);
    const data = await axios.get(
      "http://localhost:1337/auth/facebook/callback",
      {
        access_token: ACT,
      }
    );
    if (data) {
      console.log("Well done!", data);
      auth.setToken(data.jwt);

      {
        /*  
		
		{
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMDg0NTJhZDhlNTA1MzJkYjdlYmFiNCIsImlhdCI6MTU5NDM3NzUxNSwiZXhwIjoxNTk2OTY5NTE1fQ.-pQWEyTtSsuxF6BTkj_ZNc7XVImrnIxCm-_1kruMf-g",
    "user": {
        "confirmed": true,
        "blocked": false,
        "_id": "5f08452ad8e50532db7ebab4",
        "username": "Chris Snoek",
        "email": "chrissnoek8@hotmail.com",
        "provider": "facebook",
        "createdAt": "2020-07-10T10:38:34.883Z",
        "updatedAt": "2020-07-10T10:38:35.188Z",
        "__v": 0,
        "role": {
            "_id": "5eae92b243f9162da3292e90",
            "name": "Authenticated",
            "description": "Default role given to authenticated user.",
            "type": "authenticated",
            "createdAt": "2020-05-03T09:45:22.774Z",
            "updatedAt": "2020-05-03T09:45:22.774Z",
            "__v": 0,
            "id": "5eae92b243f9162da3292e90"
        },
        "photos": [],
        "id": "5f08452ad8e50532db7ebab4"
    }
}
		*/
      }

      // console.log("User profile", response.data.user);
      // console.log("User token", response.data.jwt);
    } else {
      console.log("no data");
    }
  };

  render() {
    return (
      <div>
        <div className="block sm:flex">
          <form
            onSubmit={this.handleSubmit}
            className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col"
          >
            <h1 className="font-bold mb-4 text-2xl text-green-500">
              Welkom bij Spotshare
            </h1>
            <a
              className="py-3 bg-blue-500 rounded text-white flex justify-center items-center hover:pointer hover:bg-blue-600"
              href="https://d3bdf895b473.ngrok.io/connect/facebook"
            >
              <FaFacebook className="mr-2" /> Registreer met Facebook
            </a>

            <div className="flex my-4 justify-center items-center">
              <hr className="w-full border-gray-400 mt-0" />
              <div className="mx-4 text-center text-gray-500">Of</div>
              <hr className="w-full border-gray-400 mt-0" />
            </div>

            <div className="flex">
              {this.renderInput(
                "firstname",
                "Voornaam",
                "Voornaam",
                "text",
                "w-1/2 mr-2"
              )}
              {this.renderInput(
                "lastname",
                "Achternaam",
                "Achternaam",
                "text",
                "w-1/2"
              )}
            </div>

            {this.renderInput(
              "username",
              "Gebruikersnaam",
              "Gebruikersnaam",
              "text",
              "w-full",
              () => {
                this.onInputBlur("username");
              }
            )}
            {this.renderInput(
              "email",
              "Email",
              "Emailadres",
              "text",
              "w-full",
              () => {
                this.onInputBlur("email");
              }
            )}
            {this.renderInput(
              "password",
              "Wachtwoord",
              "Vul je wachtwoord in",
              "password"
            )}

            <div className="flex items-center justify-between">
              {this.renderButton("Kom bij de club!")}
            </div>
            <div className="flex justify-center itemst-center w-full">
              <span className="text-gray-600 text-center text-sm mr-2 block">
                Heb je al een account?
              </span>

              <NavLink
                className="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600"
                to="/inloggen"
              >
                Inloggen
              </NavLink>
            </div>
          </form>

          <div className="w-full">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
                backgroundSize: `cover`,
                backgroundPosition: `center center`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
