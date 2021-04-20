import React, { useState, useEffect } from "react";
import Heading from "./Heading.jsx";
import LocationsNearby from "./LocationsNearby.jsx";
import CategorieList from "./CategorieList.jsx";
import graphQLFetch from "../../graphQLFetch.js";
import store from "../../store.js";
import { userContext } from "../../services/userContext.js";
import { Redirect, Link, useRouteMatch } from "react-router-dom";
import useConstructor from "../ConstructorHook.jsx";
import MostRecent from "./MostRecent.jsx";
import UserProfilePicture from "../UserProfilePicture.jsx";
import { FaHome, FaBookmark, FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import NotificationBoard from "./NotificationBoard.jsx";

const Dashboard = (props) => {
  const [categories, setCategories] = useState();
  const [showNotifications, setShowNotifications] = useState();
  const match = useRouteMatch();

  const getCategories = async () => {
    console.log({ match });
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
        return !value.user ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment>
            <div className="block md:flex mt-8">
              <div className="w-full md:w-1/4 px-8">
                <div className="flex items-center">
                  <div className="mr-4">
                    <UserProfilePicture profile={value.user} size={10} />
                  </div>
                  <h1 className="font-bold text-xl leading-tight text-center sm:text-left">
                    {value.user.username}
                  </h1>
                </div>
                <ul className="mt-6">
                  <li
                    className={`block py-3 flex items-center ${
                      !showNotifications
                        ? `text-blue-500 font-bold`
                        : `text-gray-900 hover:text-blue-500 hover:font-bold`
                    }`}
                    onClick={() => setShowNotifications(false)}
                  >
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                  </li>
                  <li>
                    <Link
                      className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center"
                      to={`/fotograaf/${value.user.slug}#fav`}
                    >
                      <FaBookmark className="mr-2" />
                      <span>Opgeslagen locaties</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold flex items-center"
                      to="/foto/toevoegen"
                    >
                      <FaPlus className="mr-2" />
                      <span>Foto uploaden</span>
                    </Link>
                  </li>
                  <li>
                    <span
                      className={`block py-3 flex items-center ${
                        showNotifications
                          ? `text-blue-500 font-bold`
                          : `text-gray-900 hover:text-blue-500 hover:font-bold`
                      }`}
                      onClick={() => setShowNotifications(true)}
                    >
                      <IoNotifications className="mr-2" />
                      <span>Berichten</span>
                    </span>
                  </li>
                  <li>
                    <Link
                      className="block py-3 text-gray-900 hover:text-blue-500 hover:font-bold border-t border-gray-200 pt-6 mt-6 flex items-center"
                      to=""
                    >
                      <FiLogOut className="mr-2" />
                      <span>Uitloggen</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-1/2">
                {showNotifications ? (
                  <NotificationBoard user={value.user} />
                ) : (
                  <>
                    <Heading redirect={redirect} />
                    <MostRecent />
                  </>
                )}
              </div>

              <div className="w-full md:w-1/4  px-8">
                <LocationsNearby />
                <CategorieList categories={categories} />
              </div>
            </div>
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
      locations {
        id
      }
		}
	  }`;

  const vars = {};
  const { locationCategories: result } = await graphQLFetch(query, vars, true);

  // only return categories with available locations
  return result.filter((cat) => cat.locations.length > 0);
};
