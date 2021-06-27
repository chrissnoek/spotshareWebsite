import React, { useState, useEffect, useRef } from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { userContext } from "./services/userContext.js";
import { Redirect, Link } from "react-router-dom";
import Footer from "./components/Footer.jsx";

const Home = (props) => {
  return (
    <userContext.Consumer>
      {(value) => {
        console.log(value);
        return value.user ? <Redirect to="/dashboard" /> : <HomeScreen />;
      }}
    </userContext.Consumer>
  );
};

export default Home;

const HomeScreen = () => {
  return (
    <>
      <section className="py-12 sm:py-24 bg-gray-900">
        <div className="container mx-auto block sm:flex px-6 items-center">
          <div className="mr-16 w-full mb-4 sm:mb-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-8 leading-tight">
              De beste fotografie locaties vind je bij SpotShare.
            </h1>
            <Link
              to="/inloggen"
              className="text-white rounded-full border-2 inline-block border-blue-500 transition duration-100 hover:border-blue-700 mr-4 px-4 py-3 sm:px-6 sm:py-4"
            >
              Inloggen
            </Link>
            <Link
              to="/aanmelden"
              className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
            >
              Aanmelden
            </Link>
          </div>
          <div className="w-full">
            <div
              className="rounded w-full h-64"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
                backgroundSize: `cover`,
                backgroundPosition: `center center`,
              }}
            ></div>
            <div className="rounded-full shadow-lg px-1 py-1 sm:px-2 sm:py-2  -mt-6 ml-1 sm:ml-2 lg:ml-6 bg-white text-black inline-block justify-center">
              <div className="flex justify-center items-center">
                <img
                  className="rounded-full w-8 h-8  mr-2  bottom-0 right-0 shadow-lg"
                  src="https://www.spotshare.nl/site/assets/files/6420/3-11-2019_19-28-29.140x140-pim2-thumbdbfotografie140.png"
                />
                <span className="text-black mr-2 text-xs">
                  📸 Pier scheveningen door Dennis Borman
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="flex flex-col sm:flex-row items-center ">
          <div className="flex w-full justify-center items-center order-last sm:order-last sm:mr-6">
            <div className="flex flex-col w-full pr-4">
              <div className="flex mb-4 relative">
                <img
                  className=" rounded"
                  src="https://picsum.photos/200/301"
                  alt=""
                />
                <img
                  className="rounded-full w-8 h-8 -mb-1 -mr-1 absolute bottom-0 right-0 shadow-lg"
                  src="https://picsum.photos/100/100"
                  alt=""
                />
              </div>
              <img
                className=" w-full h-full rounded"
                src="https://picsum.photos/200/302"
                alt=""
              />
            </div>
            <div className="flex flex-col w-full pt-8 pr-4">
              <img
                className="mb-4 rounded"
                src="https://picsum.photos/200/200"
                alt=""
              />
              <img
                className=" w-full h-full rounded"
                src="https://picsum.photos/200/304"
                alt=""
              />
            </div>
            <div className="flex flex-col w-full pt-8">
              <img
                className="mb-4 rounded"
                src="https://picsum.photos/200/305"
                alt=""
              />
            </div>
          </div>
          <div className="px-6 lg:px-32 ml-auto mb-6 sm:mb-0 order-first sm:order-last">
            <h2 className="text-4xl leading-tight tracking-tight mb-2">
              Vind locaties in de buurt, of juist aan de andere kant van de
              wereld.
            </h2>
            <p className="mb-4">
              Vind gemakkelijk fotografie locaties dichtbij, of verken locaties
              die je op de planinng hebt staan.
            </p>
            <Link
              to="/aanmelden"
              className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
            >
              Locaties zoeken
            </Link>
          </div>
        </div>
      </section>

      <section id="instagram" className="py-8 container px-6">
        <div className="block sm:flex items-center">
          <div className="px-6 lg:px-32 mb-6 sm:mb-0 w-full">
            <h2 className="text-4xl leading-tight tracking-tight mb-2">
              Fotografie locatie inspiratie op Instagram
            </h2>
            <p className="mb-4">
              Volg ons op instagram, en maak kans op een feature!
            </p>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.instagram.com/spotsharenl/"
              className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
            >
              Naar instagram
            </a>
          </div>
          <div className="w-full relative">
            <div className="rounded bg-white border shadow-lg">
              <div className="flex items-center p-3">
                <img
                  className="rounded-full w-10 h-10 mr-4 border shadow-md"
                  src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/22580636_1511695878889802_2909037587882573824_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=xkYTOC_bopsAX8PoHPa&oh=16714162d6978c1da26d94d8842446bb&oe=5F939D50"
                  alt="Volg spotshare op instagram"
                />
                <span className="inline-block font-bold text-black text-sm">
                  Spotshare
                </span>
              </div>
              <img src="https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/119949137_3727750567270969_4366629272378408564_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=XrBVY27DdGYAX-NHp9v&_nc_tp=15&oh=fc3a660b6b14ab25db21a661edfd3709&oe=5F9312B0" />
              <div className="items-center p-3">
                <p className="inline-block text-black text-sm">
                  Goedemorgen! Zonsopkomst bij Roelshoek prachtig vastgelegd
                  door @fotogra.qui 😍👌🏻📸 Ook een feature op SpotShare? Voeg
                  jouw fotolocatie toe op onze website! #spotsharenl
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex items-center justify-center mr-2">
                    <FaRegHeart className="mr-1" />
                    150
                  </div>
                  <div className="flex items-center justify-center">
                    <FaRegComment className="mr-1" />
                    20
                  </div>
                </div>
              </div>
            </div>
            <div className="top-0 right-0 -mt-6 sm:-mr-12 absolute rounded bg-white px-4 text-center shadow-2xl py-6">
              <img
                className="rounded-full w-20 h-20 sm:w-32 sm:h-32 border m-1 mb-3"
                src="https://scontent-ams4-1.cdninstagram.com/v/t51.2885-19/s320x320/22580636_1511695878889802_2909037587882573824_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_ohc=xkYTOC_bopsAX8PoHPa&oh=16714162d6978c1da26d94d8842446bb&oe=5F939D50"
                alt="Volg spotshare op instagram"
              />
              <h3 className="text-black text-sm">Spotshare</h3>
              <span className="block text-gray-500 text-xs">@spotsharenl</span>
              <a
                target="_blank"
                rel="noopener"
                href="https://www.instagram.com/spotsharenl/"
                className="mt-4 text-white rounded-full bg-blue-500 hover:bg-blue-700 text-xs transition duration-100 px-3 py-2 inline-block"
              >
                Volgen
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gray-100">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Klaar om je vetste locaties te delen?
            <br />
            <span className="text-blue-600">Meld je vandaag nog aan.</span>
          </h2>
          <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Aanmelden
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Inloggen
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
