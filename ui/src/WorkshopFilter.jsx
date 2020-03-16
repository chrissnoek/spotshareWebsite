/* globals React */
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class WorkshopFilter extends React.Component {
    constructor() {
        super();
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    onChangeStatus(e) {
        // get the filter, in this case the category
        const category = e.target.value;

        // get the history prop to use the history.push function 
        const { history } = this.props;
        history.push({
            pathname: '/workshops',
            search: category ? `?category=${category}` : ``
        })
    }

    render() {
        return (
            <div>
                Category:
                <select onChange={this.onChangeStatus}>
                    <option value="">Alle workshops</option>
                    <option value="landschapsfotografie">Landschapsfotografie</option>
                    <option value="nabewerking">nabewerking</option>
                    <option value="photowalk">photowalk</option>
                    <option value="nachtfotografie">nachtfotografie</option>
                </select>
            </div >
        );
    }
}

//because we need access to the this.props.history property, we use withRouter
export default withRouter(WorkshopFilter);