/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import PhotoFilter from './PhotoFilter.jsx';
import PhotoCarousel from './PhotoCarousel.jsx';
import PhotoDetail from './PhotoDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
import { Route, Link, NavLink } from "react-router-dom";

/* to support IE */
import URLSearchParams from 'url-search-params';
import store from "./store.js";

export default class PhotoList extends React.Component {

    static async fetchData(match, search) {
        // get the search query string form url
        //const { location: { search } } = this.props;

        // use URLSearchParams for IE Compatibility
        //const params = new URLSearchParams(search);

        // If category is provided in the query string, add them to our variables 
        const vars = {};
        //if (params.get('category')) vars.category = params.get('category');

        // build the graphql query
        const query = `query photos {
            photos {
            title
                        desc
                        photo {
                          url
                        }
                        slug
                        user {
                          username
                        }
                        date
                        brand
                        shutterspeed
                        iso
                        aperture
                        camera
                        likes
                        location {
                            longitude
                            latitude
                            title
                            slug
                            createdAt
                        }
            }
          }`;

        // provide the query with the variables 
        const data = await graphQLFetch(query, vars, true);
        console.log(data);
        return data;
    }

    constructor() {
        const photos = store.initialData ? store.initialData.photoList : null;
        delete store.initialData;
        super();
        this.state = {
            photos
        };
    }

    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            this.loadData();
        }
    }

    componentDidMount() {
        const { photos } = this.state;
        if (photos === null) this.loadData();
    }

    deletePhoto = async (index) => {
        const query = `mutation photoDelete($id: Int!) {
            photoDelete(id: $id)
        }`;
        const { photos } = this.state;
        const { location: { pathname, search }, history } = this.props;
        const { id } = photos[index];
        const data = await graphQLFetch(query, { id });
        if (data && data.photoDelete) {
            this.setState((prevState) => {
                const newList = [...prevState.photos];
                if (pathname === `/photos/${id}`) {
                    history.push({ pathname: '/photos', search });
                }
                newList.splice(index, 1);
                return { photos: newList };
            })
        } else {
            this.loadData();
        }
    }

    async loadData() {
        // get the search query string form url
        const { location: { search } } = this.props;

        // fetch data
        const data = await PhotoList.fetchData(null, search);
        if (data) {
            this.setState({ photos: data.photos });
        }
    }

    render() {
        const { photos } = this.state;
        if (photos === null) return null;

        return (
            <div id="page" className="p-6">
                <h1>Recente foto's</h1>
                <PhotoFilter />
                <hr />
                <PhotoCarousel photos={photos} deletePhoto={this.deletePhoto} />

            </div >
        );
    }
}