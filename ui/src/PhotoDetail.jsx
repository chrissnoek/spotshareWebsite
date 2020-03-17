/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


export default class PhotoDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            photo: { images: {}, date: "" },
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
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
        this.loadData();
    }

    async loadData() {
        // get the search query string form url
        const { match: { params: { id } } } = this.props;


        // build the graphql query
        const query = `query photo($id: Int!) {
        photo(id: $id) {
          id
          title
          date
          created
          placeID
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;

        // provide the query with the variables 
        const data = await graphQLFetch(query, { id });
        if (data) {
            this.setState({ photo: data.photo });
        }
    }

    render() {

        //const { photo: { title, images: { imageWatermark } } } = this.state;
        const { photo } = this.state;
        const position = [this.state.lat, this.state.lng];

        return (
            <div id="page" className="p-6">
                <h1>{photo.title}</h1>
                {/* <img
                    src={imageWatermark}
                    className=" w-full   block"
                    alt="Foto"
                /> */}
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