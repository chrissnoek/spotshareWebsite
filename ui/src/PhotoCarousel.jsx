/* globals React */
import React, { Component } from "react";
import { Link, withRouter, NavLink } from 'react-router-dom';

const PhotoView = withRouter(({ photo, location: { search }, deletePhoto, index }) => {
    const selectedLocation = { pathname: `/photos/${photo.id}`, search }
    return (
        <React.Fragment>
            <div className="photoCard rounded relative w-full inline-block md:w-1/2 lg:w-1/3 m-2 shadow-xs">
                <div onClick={() => { deletePhoto(index); }} className="deletePhotoTimes rounded-full overflow-hidden w-4 h-4 -top-1 hidden z-10 absolute bg-red-700">
                    <svg className="w-4 h-4 stroke-current text-white stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
                <div className="relative rounded overflow-hidden">
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

export default function PhotoCarousel({ photos, deletePhoto }) {
    const photoViews = photos.map((photo, index) => (
        <PhotoView key={photo.id} index={index} deletePhoto={deletePhoto} photo={photo} />
    ));
    return <div className="-mx-2">{photoViews}</div>;
}