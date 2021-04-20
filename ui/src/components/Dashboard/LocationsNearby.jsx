import React, { useEffect, useState } from "react";
import { findNearbyLocations } from "../FindNearbyLocations.jsx";
import { LocationHashtag } from "../LocationCards.jsx";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Img from "react-cool-img";

const LocationsNearby = () => {
  const [locations, setLocations] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (match, search, showError) => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos) => {
      console.log("succes");
      var crd = pos.coords;
      const _locations = await findNearbyLocations(crd.latitude, crd.longitude);
      setLocations(_locations);
    };

    const error = async (err) => {
      console.log("err");
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then(async (location) => {
          const _locations = await findNearbyLocations(
            location.latitude,
            location.longitude
          );
          console.log(location, _locations);
          setLocations(_locations);
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="">
      <h2 className="text-black mb-4">Locaties in de buurt</h2>

      {locations &&
        locations.map((location) => {
          return (
            <div
              key={location.id}
              className={`overflow-hidden relative rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out mb-4`}
            >
              <Link
                className="absolute w-full h-full top-0 left-0 z-10"
                to={`/fotolocatie/${location.slug}`}
              ></Link>
              <div className="flex items-center">
                <Img
                  className={`block max-w-none w-20 h-20 object-cover mr-4`}
                  src={location.photos
                    .sort((a, b) => b.likes - a.likes)[0]
                    .photo[0].url.replace(/-original|-watermark/gi, "-small")}
                  alt={`Bekijk locatie ${location.title}`}
                />

                <div className="w-full">
                  <h3 className="text-black text-sm">{location.title}</h3>
                  {location.location_categories.map((category) => (
                    <LocationHashtag key={category.id} category={category} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LocationsNearby;
