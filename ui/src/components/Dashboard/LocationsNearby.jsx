import React, { useEffect, useState } from "react";
import { findNearbyLocations } from "../FindNearbyLocations.jsx";
import LocationCard from "../LocationCards.jsx";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
      var crd = pos.coords;
      const _locations = await findNearbyLocations(crd.latitude, crd.longitude);
      setLocations(_locations);
    };

    const error = async (err) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then(async (location) => {
          const _locations = await findNearbyLocations(
            location.longitude,
            location.longitude
          );
          setLocations(_locations);
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="relative py-4 ">
      <div className="absolute top-0 left-0 bg-gray-900 h-32 w-full"></div>
      <div className="relative container px-6">
        <h2 className="text-white mb-4">Locaties in de buurt</h2>

        <Swiper spaceBetween={0} slidesPerView="auto">
          {locations &&
            locations.map((location) => {
              return (
                <SwiperSlide key={location.id}>
                  <LocationCard location={location} key={location.id} />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default LocationsNearby;
