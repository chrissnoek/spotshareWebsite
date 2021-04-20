import React, { useEffect, useState, useRef } from "react";
import { findNearbyLocations } from "../FindNearbyLocations.jsx";
/* to support IE */
import store from "../../store.js";
import useConstructor from "../ConstructorHook.jsx";
import ResultMap from "./ResultMap.jsx";
import CategorieFilter from "./CategorieFilter.jsx";
import { useHistory, useLocation } from "react-router-dom";
import LocationList from "./LocationList.jsx";

const Results = (props) => {
  const [locations, setLocations] = useState();
  const [filteredLocations, setFilteredLocations] = useState({});
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [showMap, setShowMap] = useState(false);

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    !locations && getLocations();

    const _activeFilter = getActiveFilter();

    if (locations) {
      const _filteredLocations = locations.filter((location) => {
        const include = location.location_categories.filter((categorie) => {
          if (categorie.id === _activeFilter) {
            return true;
          } else {
            return false;
          }
        });
        //console.log(location.id, include);
        if (include.length > 0) return true;
      });
      setFilteredLocations(_filteredLocations);
    }
    //console.log(_filteredLocations);
  }, [location]);

  const getLocations = async () => {
    let _locations = store.initialData ? store.initialData : null;
    console.log(store.initialData, _locations);
    delete store.initialData;
    if (!_locations) {
      console.log("getting locations");
      _locations = await Results.fetchData(null, location.search);
    }
    setLocations(_locations.filter((location) => location.photos.length > 0));
    console.log(_locations);
  };

  const getActiveFilter = () => {
    const params = new URLSearchParams(location.search);

    const _activeFilter = params.get("categorie")
      ? params.get("categorie")
      : "";

    if (_activeFilter) {
      return _activeFilter;
    } else {
      return false;
    }
  };

  useConstructor(() => {
    const _activeFilter = getActiveFilter();
    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    }
    getLocations();
    setShowMap(true);
  });

  const onFilterChange = (e, reset) => {
    const params = new URLSearchParams(location.search);

    const vars = {};
    if (params.get("lat")) vars.lat = params.get("lat");
    if (params.get("lng")) vars.lng = params.get("lng");

    let url = "";
    if (reset) {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}`;
    } else {
      url = `/fotolocaties/resultaten?lng=${vars.lng}&lat=${vars.lat}&categorie=${e.target.value}`;
    }

    history.push(url);
  };

  const selectLocation = (locationId) => {
    setSelectedLocation(locationId);
  };

  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <div className="w-full p-4 h-screen overflow-scroll">
          <h1>Resultaten</h1>
          <div className="mb-2 flex">
            <span className="mr-2">Filter op categorie:</span>
            {locations &&
              (filteredLocations.length > 0 ? (
                <CategorieFilter
                  active={activeFilter}
                  onFilterChange={onFilterChange}
                  categories={filteredLocations.map((location) => {
                    return location.location_categories;
                  })}
                />
              ) : (
                <CategorieFilter
                  active={activeFilter}
                  onFilterChange={onFilterChange}
                  categories={locations.map((location) => {
                    return location.location_categories;
                  })}
                />
              ))}
          </div>
          {locations &&
            (filteredLocations.length > 0
              ? filteredLocations.map((location) => (
                  <div key={location.id} className="w-full">
                    <LocationList
                      size="large"
                      location={location}
                      key={location.id}
                      active={selectedLocation === location.id ? true : false}
                      selectLocation={selectLocation}
                    />
                  </div>
                ))
              : locations.map((location) => (
                  <div key={location.id} className="w-full">
                    <LocationList
                      size="large"
                      location={location}
                      key={location.id}
                      active={selectedLocation === location.id ? true : false}
                      selectLocation={selectLocation}
                    />
                  </div>
                )))}
        </div>

        <div className="mb-10 w-full h-full">
          {showMap &&
            locations &&
            (filteredLocations.length > 0 ? (
              <ResultMap
                locations={filteredLocations}
                selectLocation={selectLocation}
                active={selectedLocation}
              />
            ) : (
              <ResultMap
                locations={locations}
                selectLocation={selectLocation}
                active={selectedLocation}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Results;

Results.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility
  const params = new URLSearchParams(search);

  console.log("fetching data");

  const vars = {};
  if (params.get("lat")) vars.lat = params.get("lat");
  if (params.get("lng")) vars.lng = params.get("lng");
  //vars.cat = params.get("categorie") ? params.get("categorie") : "";

  console.log(vars);

  const _locations = await findNearbyLocations(vars.lat, vars.lng);

  console.log(_locations);

  return _locations;
};
