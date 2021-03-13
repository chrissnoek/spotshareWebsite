/* globals React */
import React, { Component } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { CgTrash } from "react-icons/cg";

export const PhotoView = withRouter(
  ({ photo, location: { search }, deletePhoto, index }) => {
    const selectedLocation = { pathname: `/foto/${photo.slug}`, search };
    return (
      <React.Fragment>
        <div className="w-full inline-block my-2 mr-2">
          <div className="photoCard rounded relative shadow-xs">
            <div className="relative rounded overflow-hidden">
              <NavLink
                to={selectedLocation}
                className="absolute w-full h-full z-10"
                title="Bekijk foto nu"
              ></NavLink>
              <img
                src={photo.photo[0].url}
                className="object-cover  w-full h-48  block"
                alt="Foto"
              />
            </div>
          </div>
          <div className="photoContent pt-2">
            <span className="text-black">
              {
                // convert date type to a readable date string
                photo.date && photo.date.toDateString()
              }
            </span>
            <div className="photoInfo flex">
              <div>
                <h3 className="text-black">{photo.title}</h3>
                <span className="text-black">{photo.location.title}</span>
              </div>
              {/* <p className="text-black">{photo.category}</p> */}
              {deletePhoto != null && (
                <div
                  onClick={
                    deletePhoto != null &&
                    (() => {
                      if (
                        window.confirm(
                          "Weet je zeker dat je deze foto wilt verwijderen?"
                        )
                      )
                        deletePhoto(index);
                    })
                  }
                  className="rounded w-8 h-8 bg-red-700 ml-auto flex items-center justify-center"
                >
                  <CgTrash className="w-4 h-4 stroke-current text-white" />
                </div>
              )}
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default function PhotoCarousel({ photos, deletePhoto }) {
  const photoViews = photos.map((photo, index) => (
    <PhotoView
      key={photo.id}
      index={index}
      deletePhoto={deletePhoto}
      photo={photo}
    />
  ));
  return <div className="-mx-2">{photoViews}</div>;
}
