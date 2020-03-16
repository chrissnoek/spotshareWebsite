/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React, { Component } from "react";
import graphQLFetch from './graphQLFetch.js';


export default class WorkshopDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            workshop: { images: {}, date: "" }
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
        const query = `query workshop($id: Int!) {
        workshop(id: $id) {
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
        const data = await graphQLFetch(query, { id });
        if (data) {
            this.setState({ workshop: data.workshop });
        }
    }

    render() {

        //const { workshop: { title, images: { imageWatermark } } } = this.state;
        const { workshop } = this.state;

        return (
            <div id="page" className="p-6">
                <h1>{workshop.title}</h1>
                {/* <img
                    src={imageWatermark}
                    className=" w-full   block"
                    alt="Foto"
                /> */}
            </div>
        );
    }
}