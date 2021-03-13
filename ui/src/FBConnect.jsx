import React, { Component } from "react";
import axios from "axios";
/* to support IE */
import URLSearchParams from "url-search-params";
import authService from "./services/authService";

class FBConnect extends Component {
	componentDidMount() {
		const { location } = this.props;

		// try {
		//   console.log(action, action.search);
		//   const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
		//   const response = yield call(request, requestURL, { method: "GET" });

		//   if (response.jwt) {
		// 	// Set the user's credentials
		// 	yield all([
		// 	  call(auth.setToken, response.jwt, true),
		// 	  call(auth.setUserInfo, response.user, true),
		// 	]);
		// 	yield call(forwardTo, "/");
		//   }
		// } catch (error) {
		//   yield call(forwardTo, "/auth/login");
		// }

		// const search = this.props.location.search; // could be '?foo=bar'
		// const params = new URLSearchParams(search);
		// const accessToken = params.get("access_token"); // bar
		// console.log(accessToken);

		// console.log(
		// 	`http://localhost:1337/auth/facebook/callback${location.search}`
		// );

		axios
			.get(`http://localhost:1337/auth/facebook/callback${location.search}`)
			.then((response) => {
				// Handle success.
				console.log(response);
				console.log("Well done!");
				console.log("User profile", response.data.user);
				console.log("User token", response.data.jwt);
				authService.setToken(response.data.jwt);
				window.location = "/";
			});
	}
	render() {
		return <div>Redirecting you... (nog stylen in FBConnect)</div>;
	}
}

export default FBConnect;
