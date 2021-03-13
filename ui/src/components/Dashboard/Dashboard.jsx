import React, { useState, useEffect } from "react";
import Heading from "./Heading.jsx";
import LocationsNearby from "./LocationsNearby.jsx";
import CategorieList from "./CategorieList.jsx";
import graphQLFetch from "../../graphQLFetch.js";
import store from "../../store.js";
import { userContext } from "../../services/userContext.js";
import { Redirect } from "react-router-dom";
import useConstructor from "../ConstructorHook.jsx";
import MostRecent from "./MostRecent.jsx";

const Dashboard = (props) => {
  const [categories, setCategories] = useState();

  const getCategories = async () => {
    let _categories = store.initialData ? store.initialData : null;
    delete store.initialData;
    if (!_categories) {
      _categories = await Dashboard.fetchData();
    }
    setCategories(_categories);
  };

  useConstructor(() => {
    getCategories();
  });

  const redirect = (slug) => {
    props.history.push(slug);
  };

  return (
    <userContext.Consumer>
      {(value) => {
        console.log(value);
        return !value.user ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <Heading redirect={redirect} />
            <LocationsNearby />
            <CategorieList categories={categories} />
            <MostRecent />
          </React.Fragment>
        );
      }}
    </userContext.Consumer>
  );
};

export default Dashboard;

Dashboard.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query {
		locationCategories{
		  label
		  value
		}
	  }`;

  const vars = {};
  const { locationCategories: result } = await graphQLFetch(query, vars, true);
  return result;
};
