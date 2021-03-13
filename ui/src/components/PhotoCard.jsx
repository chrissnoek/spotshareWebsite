import React from "react";
import { Link } from "react-router-dom";

const PhotoCard = (props) => {
	let { photo, size } = props;
	let cardClass;
	let imageClass;
	let imageStyle;
	if (!size) {
		cardClass = "w-48 h-48 mr-4";
		imageClass = "w-auto h-full";
		imageStyle = { transform: "translateX(-50%)", left: "50%" };
	} else {
		if (size === "large") {
			cardClass = "w-full h-48 mb-4";
			imageClass = "w-full h-48 object-cover";
			imageStyle = { transform: "translateY(-50%)", top: "50%" };
		}
		if (size === "tall") {
			cardClass = "w-full h-56 mb-4";
			imageClass = "w-full h-56 object-cover";
			imageStyle = { transform: "translateY(-50%)", top: "50%" };
		}
	}
	return (
		<div>
			<div
				className={`relative overflow-hidden rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out ${cardClass}`}
			>
				<Link
					className="absolute w-full h-full top-0 left-0 z-10"
					to={`/fotolocatie/${photo.slug}`}
				></Link>
				<img
					className={`absolute block max-w-none ${imageClass}`}
					style={imageStyle}
					src={location.photos
						.sort((a, b) => b.likes - a.likes)[0]
						.photo[0].url.replace(/-original|-watermark/gi, "-thumbnail")}
					alt={`Bekijk foto ${photo.title}`}
				/>
				<div className="absolute w-100 bottom-0 left-0 px-3 py-2">
					<h3 className="text-white text-sm">{photo.title}</h3>
					{/* {photo.location_categories.map((category) => (
						<LocationHashtag key={category.id} category={category} />
					))} */}
				</div>
			</div>
		</div>
	);
};

const LocationHashtag = ({ category, key }) => {
	return (
		<span key={key} className="text-gray-400 mr-2 text-xs">
			#{category.label.toLowerCase()}
		</span>
	);
};

export default PhotoCard;
