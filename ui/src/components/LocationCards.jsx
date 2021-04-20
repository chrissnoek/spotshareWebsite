import React from "react";
import { Link } from "react-router-dom";
import Img from "react-cool-img";
import { useHistory } from "react-router-dom";

const LocationCard = ({ location, size, active }) => {
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

export const LocationHashtag = ({ category }) => {
  return (
    <span className="text-gray-400 mr-2 text-xs inline-block">
      #{category.label.toLowerCase()}
    </span>
  );
};

export default LocationCard;
