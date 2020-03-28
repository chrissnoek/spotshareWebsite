import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PhotoList from './PhotoList.jsx';
import PhotoReport from './PhotoReport.jsx';
import PhotoEdit from './PhotoEdit.jsx';
import PhotoDetail from './PhotoDetail.jsx';
import PhotoAdd from './PhotoAdd.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Route exact path="/photos/add" component={PhotoAdd} />
            <Route path="/photos/:id" component={PhotoDetail} />
            <Route path="/photos" component={PhotoList} />
            <Route path="/edit/:id" exact component={PhotoEdit} />
            <Route path="/edit" exact component={PhotoEdit} />
            <Route path="/report" exact component={PhotoReport} />
            <Redirect exact from="/" to="/photos" />
            <Route component={NotFound} />
        </Switch>
    )
}