import React from "react";
import graphQLFetch from './graphQLFetch.js';
import store from "./store.js";
import { Redirect } from "react-router-dom";

export default class BlogPost extends React.Component {

    static async fetchData(match, search, showError) {
        // build the graphql query
        const query = `query articleBySlug($slug: String!){
            articleBySlug(slug: $slug) {
                id
                title
                body
                slug
            }
        }`;

        let { params: { [0]: slug } } = match;
        slug = slug.replace(/\//g, "");
        const result = await graphQLFetch(query, { slug }, true);
        return result;
    }

    constructor() {
        super();
        const articleBySlug = store.initialData != null ? store.initialData.articleBySlug : null;
        delete store.initialData;
        this.state = {
            articleBySlug,
            slug: null
        };
    }

    componentDidUpdate(prevProps) {
        // const { match: { params: { id: prevId } } } = prevProps;
        // const { match: { params: { id } } } = this.props;
        // if (prevId !== id) {
        //     this.loadData();
        // }
    }

    componentDidMount() {
        const { articleBySlug } = this.state;
        if (articleBySlug === null) {
            this.loadData();
        }
    }

    async loadData() {
        // get the search query string form url
        const { match } = this.props;
        // provide the query with the variables 
        const data = await BlogPost.fetchData(match);
        if (data) {
            this.setState({ articleBySlug: data.articleBySlug });
        }
    }

    render() {
        const { articleBySlug } = this.state;
        if (articleBySlug === null) {
            console.log('slug is nullllll');
            return <Redirect to='/niet-gevonden' />;
        };

        return (
            <div id="page" className="p-6">
                <h1>{articleBySlug.title}</h1>
            </div>
        );
    }
}