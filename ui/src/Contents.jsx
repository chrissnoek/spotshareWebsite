import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WorkshopList from './WorkshopList.jsx';
import WorkshopReport from './WorkshopReport.jsx';
import WorkshopEdit from './WorkshopEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Route path="/workshops" component={WorkshopList} />
            <Route path="/edit/:id" exact component={WorkshopEdit} />
            <Route path="/edit" exact component={WorkshopEdit} />
            <Route path="/report" exact component={WorkshopReport} />
            <Redirect exact from="/" to="/workshops" />
            <Route component={NotFound} />
        </Switch>
    )
}