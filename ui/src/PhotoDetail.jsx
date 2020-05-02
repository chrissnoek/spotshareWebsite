/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal';
import { Link } from 'react-router-dom';
import store from "./store.js";


export default class PhotoDetail extends React.Component {

    static async fetchData(match, search, showError) {

        // build the graphql query
        const query = `query photo($id: Int!) {
        photo(id: $id) {
          id
          title
          date
          created
          description
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;

        let { params: { id } } = match;
        id = parseInt(id);
        const result = await graphQLFetch(query, { id }, showError);
        return result;
    }

    constructor() {
        super();
        console.log(store.initialData);
        const photo = store.initialData ? store.initialData.photo : null;
        delete store.initialData;
        this.state = {
            photo,
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        };
        console.log(this.state);
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (prevId !== id) {
            this.loadData();
        }
    }

    componentDidMount() {
        const { photo } = this.state;
        if (photo === null) {
            this.loadData();
        }
    }

    async loadData() {
        // get the search query string form url
        const { match } = this.props;
        // provide the query with the variables 
        const data = await PhotoDetail.fetchData(match);
        if (data) {
            this.setState({ photo: data.photo });
        }
    }

    render() {
        const { photo } = this.state;
        if (photo === null) return null;

        const { photo: { images: { imageWatermark } } } = this.state;
        const position = [this.state.lat, this.state.lng];

        return (
            <div id="page" className="p-6">
                <h1>{photo.title}</h1>
                <p>{photo.description}</p>
                <Link to={`/edit/${photo.id}`}>Bewerken</Link>
                <img
                    src={imageWatermark}
                    className=" w-full   block"
                    alt="Foto"
                />
                <Map className="map" center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}