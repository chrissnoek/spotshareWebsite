import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/photos" />
            {routes.map(attrs => <Route {...attrs} key={attrs.path} />)}
        </Switch>
    )
}