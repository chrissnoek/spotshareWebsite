import React, { Component } from "react";
import graphQLFetch from "./graphQLFetch.js";
import store from "./store.js";
import { FaUserSecret } from "react-icons/fa";
import Form from "./Form.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Joi from "@hapi/joi";
import slugify from "slugify";

class dataEdit extends Form {
  static async fetchData(match, search, showError) {
    console.log(match);

    const query = `query data($slug: String!) {
            users( where: { slug: $slug } ) {
              username
			        email
              id
              firstname
              lastname
              location
              profilePicture {
                url
              }
            }
          }`;

    let {
      params: { slug },
    } = match;
    console.log(slug);
    const result = await graphQLFetch(query, { slug }, true);
    console.log(result);
    return result;
  }

  componentDidMount() {
    const { data } = this.state;
    if (data === null) {
      this.loadData();
    }
  }

  constructor() {
    super();
    console.log("store: ", store.initialData);
    const data = store.initialData ? store.initialData.users[0] : null;
    console.log("data: ", data);
    delete store.initialData;
    this.state = {
      data,
      errors: {},
      photoLoading: false,
      tempFile: null,
      saving: false,
    };
    this.fileInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    const {
      match: {
        params: { slug: prevSlug },
      },
    } = prevProps;
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    if (prevSlug !== slug) {
      this.loadData();
    }
  }

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
    location: Joi.string(),
  };

  async loadData() {
    // get the search query string form url
    const { match } = this.props;
    // provide the query with the variables
    const data = await dataEdit.fetchData(match);
    console.log("loaded data: ", data);
    if (data) {
      this.setState({ data: data.users[0] });
    }
  }

  uploadFile = (file, redirect, newSlug) => {
    const formData = new FormData();

    formData.append(`files`, file, file.name);
    formData.append("ref", "user");
    formData.append("source", "users-permissions"); // Plugin name.
    formData.append("field", "profilePicture");
    formData.append("refId", this.state.data.id);

    const request = new XMLHttpRequest();
    request.open("POST", `http://localhost:1337/upload`);
    request.send(formData);
    request.addEventListener("load", redirect(newSlug));
  };

  async doSubmit(e) {
    this.setState({ saving: true });
    const {
      blob: uploadedFile,
      data: { username, id: userId },
    } = this.state;

    const redirect = (slug) => {
      //if the query returns an id in data, the photo is created
      // redirect to created photo
      const doRedirect = () => {
        const { history } = this.props;
        history.push({
          pathname: `/fotograaf/${slug}`,
        });
      };
      setTimeout(doRedirect, 2000);
      //window.location = `/fotograaf/${slug}`;
    };

    // update the fields
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            slug
          }
        }
      }`;

    const variables = {
      input: {
        where: {
          id: userId,
        },
        data: {
          ...this.state.data,
        },
      },
    };

    delete variables.input.data.profilePicture;
    delete variables.input.data.id;

    variables.input.data.slug = slugify(username, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const data = await graphQLFetch(query, variables, true);

    if (data.updateUser) {
      if (uploadedFile !== null && uploadedFile !== undefined) {
        console.log("in upload file");
        this.uploadFile(uploadedFile, redirect, data.updateUser.user.slug);
      } else {
        console.log("straight to redirect");
        redirect(data.updateUser.user.slug);
      }
    }
  }

  photoValidation = (file) => {
    if (file.size > 27000000) {
      this.setState((prevState) => ({
        ...prevState,
        invalidFields: {
          ...prevState.invalidFields,
          blob: "Selecteer een afbeelding kleiner dan 27MB.",
        },
      }));
      return;
    } else {
      this.setState((prevState) => {
        const invalidFields = { ...prevState.invalidFields };
        if (invalidFields.hasOwnProperty("blob")) delete invalidFields["blob"];
        return { invalidFields };
      });
    }
  };

  onFileChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ blob: e.target.files[0] });

    this.photoValidation(file);

    this.setState({
      photoLoading: true,
    });

    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        photoLoading: false,
        tempFile: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
  };

  removeImage = () => {
    console.log("remove");
    this.setState({
      tempFile: null,
      photo: {},
      blob: null,
    });
  };

  render() {
    const { data, photoLoading, tempFile } = this.state;
    if (data === null) {
      console.log("return null from render");
      return null;
    }

    return (
      <form
        name="profileEdit"
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        {photoLoading && (
          <AiOutlineLoading3Quarters className="fill-current text-green-500" />
        )}

        <div className="p-6">
          <div className="flex flex-col justify-center items-center mb-4 relative cursor-pointer">
            <input
              type="file"
              name="blob"
              ref={this.fileInput}
              onChange={this.onFileChange}
              onDrop={this.handleOnDrop}
              onDragOver={this.handleOnDragOver}
              onDragLeave={this.handleOnDragLeave}
              className="absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
            />

            {tempFile ? (
              <div
                id="imagePreview"
                className="relative h-16 w-16 overflow-hidden rounded-full mb-2"
              >
                {/* <div
                      onClick={this.removeImage}
                      className="border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100"
                    >
                      <FiTrash2 className="stroke-current text-gray-100" />
                    </div> */}
                <img
                  src={tempFile}
                  id="output_image"
                  className="w-auto h-16 rounded-full mb-2"
                />
              </div>
            ) : data.profilePicture !== null &&
              data.profilePicture !== undefined ? (
              <div
                id="imagePreview"
                className="relative h-16 w-16 overflow-hidden rounded-full mb-2"
              >
                <img
                  className="w-auto h-16 rounded-full mb-2"
                  src={data.profilePicture.url}
                ></img>
              </div>
            ) : (
              <div className="fill-current h-16 w-16 mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center">
                <FaUserSecret className="text-2xl" />
              </div>
            )}

            <span className="font-bold text-blue-500">
              Profielfoto veranderen
            </span>
          </div>

          <div className="flex flex-col w-full">
            {this.renderInput(
              "username",
              "Gebruikersnaam",
              "Gebruikersnaam",
              "text"
            )}
            {this.renderInput("email", "Email", "Email", "text")}
            {this.renderInput("firstname", "Voornaam", "Voornaam", "text")}
            {this.renderInput("lastname", "Achternaam", "Achternaam", "text")}
            {this.renderInput("location", "Woonplaats", "Woonplaats", "text")}
          </div>
          {this.renderButton("Profiel opslaan", this.state.saving)}
        </div>
      </form>
    );
  }
}

export default dataEdit;
