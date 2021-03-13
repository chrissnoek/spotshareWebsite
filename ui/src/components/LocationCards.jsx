import React from "react";
import { Link } from "react-router-dom";
import Img from "react-cool-img";
import { useHistory } from "react-router-dom";

const LocationCard = (props) => {
  let { location, size, active } = props;
  let cardClass;
  let imageClass;
  let imageStyle;
  if (!size) {
    cardClass = "w-48 h-48 mr-4 lg:w-64 lg:h-64 locationCard";
    imageClass = "w-auto h-full";
    imageStyle = {
      backgroundColor: "grey",
      transform: "translateX(-50%)",
      left: "50%",
    };
  } else {
    if (size === "large") {
      cardClass = active
        ? "w-full h-48 mb-4 border-4 border-red-500"
        : "w-full h-48 mb-4";
      imageClass = "w-full h-48 object-cover";
      imageStyle = {
        backgroundColor: "grey",
        transform: "translateY(-50%)",
        top: "50%",
      };
    }
  }
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out ${cardClass}`}
      >
        <Link
          className="absolute w-full h-full top-0 left-0 z-10"
          to={`/fotolocatie/${location.slug}`}
        ></Link>

        <Img
          className={`absolute block max-w-none ${imageClass}`}
          style={imageStyle}
          src={location.photos
            .sort((a, b) => b.likes - a.likes)[0]
            .photo[0].url.replace(/-original|-watermark/gi, "-small")}
          alt={`Bekijk locatie ${location.title}`}
        />

        <div className="absolute w-100 bottom-0 left-0 px-3 py-2">
          <h3 className="text-white text-sm">{location.title}</h3>
          {location.location_categories.map((category) => (
            <LocationHashtag key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LocationHashtag = ({ category }) => {
  return (
    <span className="text-gray-400 mr-2 text-xs">
      #{category.label.toLowerCase()}
    </span>
  );
};

export default LocationCard;

export const LocationList = ({ location, active, selectLocation }) => {
  let history = useHistory();
  let cardClass = active
    ? "w-full mb-1 border-2 border-green-500"
    : "w-full mb-1 border-2 border-white";

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

  return (
    <div>
      <div
        onMouseOver={() => {
          selectLocation(location.id);
        }}
        onMouseOut={() => {
          selectLocation("");
        }}
        className={`relative shadow hover:shadow-lg transition ease-in-out rounded ${cardClass}`}
      >
        <div
          className="flex items-center p-1"
          onClick={() => {
            goToLocation(location.slug, location.id);
          }}
        >
          <Img
            className={`rounded block max-w-none w-20 h-16 object-cover`}
            style={{
              backgroundColor: "grey",
            }}
            src={location.photos
              .sort((a, b) => b.likes - a.likes)[0]
              .photo[0].url.replace(/-original|-watermark/gi, "-small")}
            alt={`Bekijk locatie ${location.title}`}
          />

          <div className="px-5 py-2">
            <h3 className="text-black text-lg">{location.title}</h3>
            {location.location_categories.map((category) => (
              <LocationHashtag key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
