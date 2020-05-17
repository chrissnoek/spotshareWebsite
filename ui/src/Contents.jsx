import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';

export default function Contents() {
    return (
        <Switch>

            <Redirect
                from="/"
                to="/fotos"
                exact
            />

            {routes.map(attrs => <Route {...attrs} key={attrs.path} />)}
        </Switch>
    )
}