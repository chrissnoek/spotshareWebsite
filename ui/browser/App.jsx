import "babel-polyfill";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../src/css/style.scss";
import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import auth from "../src/services/authService";
import { userContext } from "../src/services/userContext.js";

import Page from "../src/Page.jsx";
import store from "../src/store.js";

// get the initial data from ssr page, and store it in the store object to access when hydrating
store.initialData = window.__INITIAL_DATA__;

class App extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    this.setState({ user });
    console.log("user from app component", user);
  }

  render() {
    return (
      <Router>
        <userContext.Provider value={this.state}>
          <Page />
        </userContext.Provider>
      </Router>
    );
  }
}

export default App;

const element = <App />;

// render
ReactDOM.hydrate(element, document.getElementById("contents"));

if (module.hot) {
  module.hot.accept();
}

// const initialPhotos = [
//   {
//     id: 8046,
//     memberId: 4790,
//     locationId: 2289,
//     eventId: 1,
//     created: new Date("2018-08-15"),
//     title: "I love Zeeland",
//     description: "I love Zeeland",
//     date: new Date("2019-09-24T19:00:26"),
//     likes: 10,
//     likesThisWeek: 1,
//     exif: {
//       brand: "Canon",
//       apeture: "16",
//       shutterspeed: "8/1",
//       ISO: "100",
//       camera: "Canon EOS 6D Mark II"
//     },
//     image: {
//       imageSmall: "",
//       imageLarge: "",
//       imageThumbnail: ""
//     }
//   },
//   {
//     id: 8047,
//     memberId: 4790,
//     locationId: 2289,
//     eventId: 1,
//     created: new Date("2018-08-15"),
//     title: "I love Zeeland",
//     description: "I love Zeeland",
//     date: new Date("2019-09-24T19:00:26"),
//     likes: 10,
//     likesThisWeek: 1,
//     exif: {
//       brand: "Canon",
//       apeture: "16",
//       shutterspeed: "8/1",
//       ISO: "100",
//       camera: "Canon EOS 6D Mark III"
//     },
//     image: {
//       imageSmall: "",
//       imageLarge: "",
//       imageThumbnail: ""
//     }
//   }
// ];
