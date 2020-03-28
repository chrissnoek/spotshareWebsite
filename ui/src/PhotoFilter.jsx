/* globals React */
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

class PhotoFilter extends React.Component {
    constructor({ location: { search } }) {
        super();
        const params = new URLSearchParams(search);
        this.state = {
            category: params.get('category') || ''
        }
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('prevProps', prevProps.location.search);
        console.log('thisProps', this.props.location.search);
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            this.showOriginalFilter();
        }
    }

    onChangeStatus(e) {
        this.setState({ category: e.target.value });
    }


    showOriginalFilter() {
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        this.setState({ category: params.get('category') || '' });
    }

    applyFilter() {
        // get the filter, in this case the category
        const { category } = this.state;

        // get the history prop to use the history.push function 
        // to use history, we need to export PhotoFilter withRouter() as done at last rule
        const { history } = this.props;
        history.push({
            pathname: '/photos',
            search: category ? `?category=${category}` : ``
        })
    }

    render() {
        // get the location search to display current filter in select
        const { category } = this.state;

        return (
            <div>
                Category:
                <select value={category} onChange={this.onChangeStatus}>
                    <option value="">Alle photos</option>
                    <option value="landschapsfotografie">Landschapsfotografie</option>
                    <option value="nabewerking">nabewerking</option>
                    <option value="photowalk">photowalk</option>
                    <option value="nachtfotografie">nachtfotografie</option>
                </select>
                <button type='button' onClick={this.applyFilter}>Apply</button>
            </div >
        );
    }
}

//because we need access to the this.props.history property, we use withRouter
export default withRouter(PhotoFilter);