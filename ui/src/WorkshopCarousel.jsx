/* globals React */
import React, { Component } from "react";
import { Link, withRouter, NavLink } from 'react-router-dom';

const WorkshopView = withRouter(({ workshop, location: { search } }) => {
    const selectedLocation = { pathname: `/workshops/${workshop.id}`, search }
    return (
        <React.Fragment>
            <div className="workshopCard rounded relative overflow-hidden my-2">
                <div className="relative rounded">
                    <NavLink
                        to={selectedLocation}
                        className="absolute w-full h-full z-10"
                        title="Bekijk foto nu"
                    ></NavLink>
                    <img
                        src={workshop.images.imageWatermark}
                        className="object-cover  w-full h-48  block"
                        alt="Foto"
                    />

                    <div className="workshopContent p-4 absolute bottom-0 left-0">
                        <span className="text-white">
                            {// convert date type to a readable date string
                                workshop.date.toDateString()}
                        </span>
                        <div className="workshopInfo">
                            <h3 className="text-white">{workshop.title}</h3>
                            <span className="text-white">{workshop.place}</span>
                            <p className="text-white">{workshop.category}</p>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
});

export default function WorkshopCarousel(props) {
    const workshops = props.workshops.map(workshop => (
        <WorkshopView key={workshop.id} workshop={workshop} />
    ));
    return <div>{workshops}</div>;
}