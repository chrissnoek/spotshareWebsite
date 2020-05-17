/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component, Fragment } from "react";
import graphQLFetch from './graphQLFetch.js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal';
import { Link } from 'react-router-dom';
import store from "./store.js";
import { Redirect } from "react-router-dom";
import userIcon from "./images/userMarker.svg";
import locationIcon from "./images/locationMarker.svg";
import shadowIcon from "./images/markerShadow.png";
import { NavLink } from 'react-router-dom';


export default class LocationDetailStrapi extends React.Component {

    static async fetchData(match, search, showError) {

        // build the graphql query
        const query = `query locationBySlug($slug: String!){
            locationBySlug(slug: $slug) {
                title
                photos {
                    id
                    title
                    slug
                    photo {
                        id
                        name
                        url
                    }
                }
                desc
                slug
                id
                longitude
                latitude
            }
        }`;

        let { params: { id: slug } } = match;
        console.log(match);
        const result = await graphQLFetch(query, { slug }, true);
        return result;
    }

    constructor() {
        super();
        const locationBySlug = store.initialData ? store.initialData.locationBySlug : null;
        delete store.initialData;
        this.state = {
            locationBySlug,
            redirect: false,
            zoom: 13,
            userLocationKnown: false,
            userMarker: null,
            userLocation: {
                longitude: null,
                latitude: null
            }
        };
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (prevId !== id) {
            this.loadData();
        }
    }

    componentDidMount() {
        const { locationBySlug } = this.state;
        if (locationBySlug === null) {
            this.loadData();
        }

        // loading leaflet in componentDidMount because it doenst support SSR
        const L = require("leaflet");

        const userMarker = new L.Icon({
            iconUrl: userIcon,
            iconRetinaUrl: userIcon,

            iconAnchor: [16, 40],
            popupAnchor: [0, -40],
            shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
            shadowAnchor: [13, 40],
            iconSize: new L.Point(32, 40),
        });

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconUrl: locationIcon,
            iconRetinaUrl: locationIcon,
            iconAnchor: [16, 40],
            popupAnchor: [0, -40],
            shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
            shadowAnchor: [13, 40],
            iconSize: new L.Point(32, 40),
        });

        // get users position
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            this.setState(
                (prevState) => ({
                    ...prevState, userMarker, userLocationKnown: true, userLocation: { longitude: crd.longitude, latitude: crd.latitude }
                })
            )
        }

        const error = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);

            fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(location => {
                    this.setState(
                        (prevState) => ({
                            ...prevState, userMarker, userLocationKnown: true, userLocation: { longitude: location.longitude, latitude: location.latitude }
                        })
                    )
                });
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

    }

    async loadData() {
        // get the search query string form url
        const { match } = this.props;
        // provide the query with the variables 
        const data = await LocationDetailStrapi.fetchData(match);
        if (data.locationBySlug != null) {
            this.setState({ locationBySlug: data.locationBySlug });
        } else {
            console.log('return not found');
            this.setState({ redirect: true });
            console.log(this.state);
        }
    }

    render() {
        const { locationBySlug, redirect } = this.state;
        if (redirect) {
            console.log('redirect', redirect);
            return <Redirect to="/niet-gevonden" />;
        }
        if (locationBySlug === null) return null;

        const { userLocation, userLocationKnown, userMarker, } = this.state;
        const { photos } = locationBySlug;

        const position = [locationBySlug.longitude, locationBySlug.latitude];
        const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;

        return (
            <div id="page">
                <div id="photoInfo" className="p-6">
                    <h1 className="text-2xl font-bold mb-1 text-gray-800 block">{locationBySlug.title}</h1>
                    <p className="text-gray-600">{locationBySlug.desc}</p>
                    <Map className="map" id="photoLocation" center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Foto locatie
                            </Popup>
                        </Marker>
                        {userLocationKnown && <Marker position={calculatedUserLocation} icon={userMarker}>
                            <Popup>
                                Jouw locatie
                            </Popup>
                        </Marker>}
                    </Map>
                    <h2 className="text-xl font-bold mb-1 text-gray-800 block">Foto's gemaakt op fotolocatie {locationBySlug.title}</h2>
                    <div className="-mx-2">
                        {photos.map(
                            photoItem => {
                                return <LocationPhotoItem item={photoItem} key={photoItem.id} />
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function LocationPhotoItem(props) {
    const itemPhoto = props.item.photo[0];
    const selectedLocation = `/foto/${props.item.slug}`;
    return (
        <React.Fragment>
            <div className="w-full inline-block md:w-1/2 lg:w-1/3 p-2">
                <div className="photoCard rounded relative shadow-xs">
                    <div className="relative rounded overflow-hidden">
                        <NavLink
                            to={selectedLocation}
                            className="absolute w-full h-full z-10"
                            title="Bekijk foto nu"
                        ></NavLink>
                        <img
                            src={itemPhoto.url}
                            className="object-cover  w-full h-48  block"
                            alt="Foto"
                        />

                        <div className="photoContent p-4 absolute bottom-0 left-0">
                            <div className="photoInfo">
                                <h3 className="text-white">{props.item.title}</h3>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );;
}