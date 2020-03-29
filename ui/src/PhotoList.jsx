/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import PhotoFilter from './PhotoFilter.jsx';
import PhotoCarousel from './PhotoCarousel.jsx';
import PhotoDetail from './PhotoDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

/* to support IE */
import URLSearchParams from 'url-search-params';
import { Route, Link, NavLink } from "react-router-dom";

export default class PhotoList extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: []
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
        this.loadData();
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

        // use URLSearchParams for IE Compatibility
        const params = new URLSearchParams(search);

        // If category is provided in the query string, add them to our variables 
        const vars = {};
        if (params.get('category')) vars.category = params.get('category');

        // build the graphql query
        const query = `query photoList($category: String) {
        photoList(category: $category) {
          id
          title
          date
          created
          images {
            imageThumb
            imageOriginal
            imageWatermark
          }
        }
      }`;

        // provide the query with the variables 
        const data = await graphQLFetch(query, vars);
        if (data) {
            this.setState({ photos: data.photoList });
        }
    }

    render() {
        const { match } = this.props;
        return (
            <div id="page" className="p-6">
                <h1>Recente foto's</h1>
                <PhotoFilter />
                <hr />
                <PhotoCarousel photos={this.state.photos} deletePhoto={this.deletePhoto} />
                <hr />
                <NavLink to="/photos/add">Foto toevoegen</NavLink>
                <hr />
                <Route path={`${match.path}/:id`} component={PhotoDetail} />
            </div >
        );
    }
}