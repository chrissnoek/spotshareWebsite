import React, { Component, useState, useEffect } from "react";
import Contents from "./Contents.jsx";
import { NavLink, useHistory } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { userContext } from "./services/userContext.js";
import Footer from "./components/Footer.jsx";
import Notifications from "./components/notificationCenter/notifications.jsx";
import { IoNotificationsOutline } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const history = useHistory();

  const closeMenu = () => {
    setIsOpen(false);
    setOpenNotifications(false);
  };

  const notIconClick = (e) => {
    e.preventDefault();
    setOpenNotifications(!openNotifications);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onNotClick = (link) => {
    setOpenNotifications(false);
    history.push(link);
  };

  return (
    <header className="bg-gray-900 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center">
      <div className="flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900">
        <div>
          <NavLink onClick={closeMenu} exact to="/">
            <img
              src="http://dkotwt30gflnm.cloudfront.net/assets/spotshare-logo.png"
              className="h-8"
              alt="Spotshare, de mooiste fotolocaties bij jou in de buurt"
            />
          </NavLink>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleOpen}
            type="button"
            className="text-gray-400 hover:text-white focus:text-white focus:outline-none"
          >
            {isOpen ? (
              <FiX className="fill-current text-white" />
            ) : (
              <FiMenu className="fill-current text-white" />
            )}
          </button>
        </div>
      </div>
      <nav
        className={`px-2 pt-2 pb-4 sm:p-0 items-center sm:flex ${
          isOpen ? " block" : " hidden"
        }`}
      >
        <NavLink
          onClick={closeMenu}
          to="/fotolocatie/volendam"
          className="block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
        >
          TestLocatie
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/foto/haven-volendam"
          className="block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
        >
          TestFoto
        </NavLink>
        <NavLink
          onClick={closeMenu}
          to="/foto/toevoegen"
          className="block text-white font-semibold rounded hover:bg-gray-800 px-2 py-1"
        >
          Uploaden
        </NavLink>

        <userContext.Consumer>
          {(value) =>
            !value.user ? (
              <React.Fragment>
                <NavLink
                  onClick={closeMenu}
                  to="/aanmelden"
                  className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
                >
                  Aanmelden
                </NavLink>
                <NavLink
                  onClick={closeMenu}
                  to="/inloggen"
                  className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
                >
                  Inloggen
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="relative">
                  <a
                    onClick={notIconClick}
                    className="relative block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
                  >
                    <IoNotificationsOutline className="text-2xl" />
                  </a>
                  <Notifications
                    onClick={onNotClick}
                    user={value.user}
                    show={openNotifications}
                  />
                </div>
                <NavLink
                  onClick={closeMenu}
                  to={`/fotograaf/${value.user.slug}`}
                  className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
                >
                  {value.user.username}
                </NavLink>
                <NavLink
                  onClick={closeMenu}
                  to="/uitloggen"
                  className="block mt-1 text-white font-semibold rounded hover:bg-gray-800 px-2 py-1 sm:mt-0 sm:ml-2"
                >
                  Uitloggen
                </NavLink>
              </React.Fragment>
            )
          }
        </userContext.Consumer>
      </nav>
    </header>
  );
};

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
      <Footer />
      <ToastContainer />
    </div>
  );
}
