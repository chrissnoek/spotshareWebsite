/* globals React */
import React, { Component } from "react";
import { Link, withRouter, NavLink } from 'react-router-dom';

const PhotoView = withRouter(({ photo, location: { search } }) => {
    const selectedLocation = { pathname: `/photos/${photo.id}`, search }
    return (
        <React.Fragment>
            <div className="photoCard rounded relative overflow-hidden my-2">
                <div className="relative rounded">
                    <NavLink
                        to={selectedLocation}
                        className="absolute w-full h-full z-10"
                        title="Bekijk foto nu"
                    ></NavLink>
                    <img
                        src={photo.images.imageWatermark}
                        className="object-cover  w-full h-48  block"
                        alt="Foto"
                    />

                    <div className="photoContent p-4 absolute bottom-0 left-0">
                        <span className="text-white">
                            {// convert date type to a readable date string
                                photo.date.toDateString()}
                        </span>
                        <div className="photoInfo">
                            <h3 className="text-white">{photo.title}</h3>
                            <span className="text-white">{photo.place}</span>
                            <p className="text-white">{photo.category}</p>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
});

export default function PhotoCarousel(props) {
    const photos = props.photos.map(photo => (
        <PhotoView key={photo.id} photo={photo} />
    ));
    return <div>{photos}</div>;
}