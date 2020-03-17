/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import PhotoFilter from './PhotoFilter.jsx';
import PhotoAdd from './PhotoAdd.jsx';
import PhotoCarousel from './PhotoCarousel.jsx';
import PhotoDetail from './PhotoDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

/* to support IE */
import URLSearchParams from 'url-search-params';
import { Route } from "react-router-dom";

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
          placeID
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

    createPhoto = async photo => {
        // create a mutation query with a variable, which is passed in the body in the fetch
        // first addAPhoto is just a mutation name, afther is the variable and the type which is photoinputs
        // next is the actual mutation which is getting the $photo variable
        // the query should return only the id
        const query = `mutation addAPhoto($photo: PhotoInputs!) {
          photoAdd(photo: $photo) {
            id
          }
      }`;

        const data = await graphQLFetch(query, { photo });
        if (data) {
            this.loadData();
        }
    };

    render() {
        const { match } = this.props;
        return (
            <div id="page" className="p-6">
                <h1>Upcoming Photos</h1>
                <PhotoFilter />
                <hr />
                <PhotoCarousel photos={this.state.photos} />
                <hr />
                <PhotoAdd createPhoto={this.createPhoto} />
                <hr />
                <Route path={`${match.path}/:id`} component={PhotoDetail} />
            </div >
        );
    }
}