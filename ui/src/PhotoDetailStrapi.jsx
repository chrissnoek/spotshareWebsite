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

export default class PhotoDetailStrapi extends React.Component {

    static async fetchData(match, search, showError) {

        // build the graphql query
        const query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
                desc
                photo {
                    url
                }
                slug
                date
                brand
                shutterspeed
                iso
                aperture
                camera
                likes
                focalLength
                location {
                    longitude
                    latitude
                }
            }
        }`;

        let { params: { id: slug } } = match;
        console.log(match);
        const result = await graphQLFetch(query, { slug }, true);
        return result;
    }

    constructor() {
        super();
        const photoBySlug = store.initialData ? store.initialData.photoBySlug : null;
        delete store.initialData;
        this.state = {
            photoBySlug,
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
        const { photoBySlug } = this.state;
        if (photoBySlug === null) {
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
        const data = await PhotoDetailStrapi.fetchData(match);
        if (data.photoBySlug != null) {
            console.log('Setting state');
            this.setState({ photoBySlug: data.photoBySlug });
            console.log(this.state);
        } else {
            console.log('return not found');
            this.setState({ redirect: true });
            console.log(this.state);
        }
    }

    render() {
        const { photoBySlug, redirect } = this.state;
        if (redirect) {
            console.log('redirect', redirect);
            return <Redirect to="/niet-gevonden" />;
        }
        if (photoBySlug === null) {
            console.log('return null from render');
            return null;
        }

        const { userLocation, userLocationKnown, userMarker } = this.state;

        const position = [photoBySlug.location.longitude, photoBySlug.location.latitude];
        const calculatedUserLocation = userLocation.latitude ? [userLocation.latitude, userLocation.longitude] : null;

        return (
            <div id="page">
                <img
                    src={photoBySlug.photo[0].url}
                    className=" w-full   block"
                    alt="Foto"
                />
                <div id="photoInfo" className="p-6">
                    <h1 className="text-2xl font-bold mb-1 text-gray-800 block">{photoBySlug.title}</h1>
                    <p className="text-gray-600">{photoBySlug.desc}</p>
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
                </div>
            </div>
        );
    }
}