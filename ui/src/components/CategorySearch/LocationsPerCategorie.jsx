import React, { useEffect, useState, useRef } from "react";
import { findNearbyLocations } from "../FindNearbyLocations.jsx";
/* to support IE */
import store from "../../store.js";
import { LocationList } from "../LocationCards.jsx";
import useConstructor from "../ConstructorHook.jsx";
import ResultMap from "../Results/ResultMap.jsx";
import CategorieFilter from "../Results/CategorieFilter.jsx";
import { useHistory, useLocation } from "react-router-dom";
import graphQLFetch from "../../graphQLFetch.js";

const LocationsPerCategorie = (props) => {
  const [locations, setLocations] = useState();
  const [filteredLocations, setFilteredLocations] = useState({});
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
      _locations = await LocationsPerCategorie.fetchData(
        props.match,
        location.search
      );
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

  const selectLocation = (locationId) => {
    setSelectedLocation(locationId);
  };

  return (
    <div className="relative h-screen">
      <div className="flex h-full">
        <div className="w-full p-4 h-screen overflow-scroll">
          <h1>Resultaten</h1>
          {/* <div className="mb-2 flex">
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
          </div> */}
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

export default LocationsPerCategorie;

LocationsPerCategorie.fetchData = async (match, search, showError) => {
  // test URL; http://localhost:8000/fotolocaties/resultaten?lng=52.379189&lat=4.899431
  // use URLSearchParams for IE Compatibility

  console.log(match);

  let {
    params: { value },
  } = match;

  console.log(value);

  const query = `query locationCategorie($value:String!){
    locationCategories(where:{value: $value}) {
      label
    value
    locations {
      id
      title
      longitude
      latitude
      slug
      location_categories {
        label
        value
        locations {
          title
        }
      }
      photos {
            id
            likes
            title
            slug
            photo {
                url 
            }
        }
    }
  }
  }`;

  const data = await graphQLFetch(query, { value }, true);
  if (data) {
    console.log(data.locationCategories[0].locations);
  }

  return data.locationCategories[0].locations;

  // const params = new URLSearchParams(search);

  // console.log("fetching data");

  // const vars = {};
  // if (params.get("lat")) vars.lat = params.get("lat");
  // if (params.get("lng")) vars.lng = params.get("lng");
  // //vars.cat = params.get("categorie") ? params.get("categorie") : "";

  // console.log(vars);

  // const _locations = await findNearbyLocations(vars.lat, vars.lng);

  // console.log(_locations);

  // return _locations;
};
