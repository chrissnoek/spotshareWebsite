/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import WorkshopFilter from './WorkshopFilter.jsx';
import WorkshopAdd from './WorkshopAdd.jsx';
import WorkshopCarousel from './WorkshopCarousel.jsx';
import WorkshopDetail from './WorkshopDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

/* to support IE */
import URLSearchParams from 'url-search-params';
import { Route } from "react-router-dom";

export default class WorkshopList extends React.Component {
    constructor() {
        super();
        this.state = {
            workshops: []
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
        const query = `query workshopList($category: String) {
        workshopList(category: $category) {
          id
          title
          date
          created
          place
          category
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
            this.setState({ workshops: data.workshopList });
        }
    }

    createWorkshop = async workshop => {
        // create a mutation query with a variable, which is passed in the body in the fetch
        // first addAWorkshop is just a mutation name, afther is the variable and the type which is workshopinputs
        // next is the actual mutation which is getting the $workshop variable
        // the query should return only the id
        const query = `mutation addAWorkshop($workshop: WorkshopInputs!) {
          workshopAdd(workshop: $workshop) {
            id
          }
      }`;

        const data = await graphQLFetch(query, { workshop });
        if (data) {
            this.loadData();
        }
    };

    render() {
        const { match } = this.props;
        return (
            <div id="page" className="p-6">
                <h1>Upcoming Workshops</h1>
                <WorkshopFilter />
                <hr />
                <WorkshopCarousel workshops={this.state.workshops} />
                <hr />
                <WorkshopAdd createWorkshop={this.createWorkshop} />
                <hr />
                <Route path={`${match.path}/:id`} component={WorkshopDetail} />
            </div>
        );
    }
}