import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import locationIcon from "../../images/locationMarker.svg";
import userIcon from "../../images/userMarker.svg";
import visIcon from "../../images/visitedMarker.svg";
import Img from "react-cool-img";
import { useHistory } from "react-router-dom";

const ResultMap = ({ locations, selectLocation, active }) => {
  const [bounds, setBounds] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [locIcon, setLocIcon] = useState(false);
  const [visitedIcon, setVisIcon] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState([]);
  const [prevSettings, setPrevSettings] = useState();
  const [dynamicBounds, setDynamicBounds] = useState({});
  let history = useHistory();

  const loadMap = () => {
    // loading leaflet in componentDidMount because it doenst support SSR
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    const _hoverIcon = new L.Icon({
      iconUrl: userIcon,
      iconRetinaUrl: userIcon,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    const _locIcon = new L.Icon({
      iconUrl: locationIcon,
      iconRetinaUrl: locationIcon,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    const _visIcon = new L.Icon({
      iconUrl: visIcon,
      iconRetinaUrl: visIcon,
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    setHoverIcon(_hoverIcon);
    setLocIcon(_locIcon);
    setVisIcon(_visIcon);

    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    //const bounds = Leaflet.latLngBounds([position, position2]);
    const _bounds = L.latLngBounds(
      locations.map((location) => {
        return [location.latitude, location.longitude];
      })
    );
    setBounds(_bounds);

    if (sessionStorage.getItem("visitedLocations")) {
      setVisitedLocations(
        JSON.parse(sessionStorage.getItem("visitedLocations"))
      );
    }

    if (sessionStorage.getItem("prevsettings")) {
      console.log("getItem prevsettings if");
      setPrevSettings(JSON.parse(sessionStorage.getItem("prevsettings")));
      setBounds(null);
    } else {
      setDynamicBounds((dynamicBounds.bounds = _bounds));
      console.log({ dynamicBounds });
    }

    setShowMap(true);
  };

  // useConstructor(() => {
  //   loadMap();
  // });

  useEffect(() => {
    loadMap();
  }, []);

  const goToLocation = (slug, id) => {
    let data = [];
    if (sessionStorage.getItem("visitedLocations")) {
      data = JSON.parse(sessionStorage.getItem("visitedLocations"));
    }
    if (data.indexOf(id) === -1) {
      data.push(id);
    }
    sessionStorage.setItem("visitedLocations", JSON.stringify(data));

    history.push(`/fotolocatie/${slug}`);
  };

  const onViewportChanged = (viewport) => {
    console.log(viewport);
    setPrevSettings(viewport);
    sessionStorage.setItem("prevsettings", JSON.stringify(viewport));
  };

  return (
    <>
      {showMap && (
        <Map
          center={prevSettings ? prevSettings.center : [52.0841037, 4.9424092]}
          zoom={prevSettings ? prevSettings.zoom : 13}
          // center={[52.0841037, 4.9424092]}
          // zoom={13}
          scrollWheelZoom={false}
          className="resultMap w-full"
          id="photoLocation"
          onViewportChanged={onViewportChanged}
          bounds={bounds || null}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location) => {
            return (
              <Marker
                position={[location.latitude, location.longitude]}
                key={location.id}
                onMouseOver={() => {
                  console.log("check", active, location.id);
                  selectLocation(location.id);
                }}
                onMouseOut={() => {
                  selectLocation("");
                }}
                className="hover:translate-x-2 bg-black border border-red-500"
                icon={
                  active === location.id
                    ? hoverIcon
                    : visitedLocations.indexOf(location.id) !== -1
                    ? visitedIcon
                    : locIcon
                }
              >
                <Popup autoPan={false}>
                  <span className="font-bold text-large block mb-2">
                    {location.title}
                  </span>
                  <Img
                    className={` block max-w-none w-full h-18 object-cover`}
                    src={location.photos
                      .sort((a, b) => b.likes - a.likes)[0]
                      .photo[0].url.replace(/-original|-watermark/gi, "-small")}
                    alt={`Bekijk locatie ${location.title}`}
                  />
                  <div
                    className="text-blue-400 font-bold text-large mt-2"
                    onClick={() => {
                      goToLocation(location.slug, location.id);
                    }}
                  >
                    Bekijk fotolocatie »
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </Map>
      )}
    </>
  );
};

export default ResultMap;
