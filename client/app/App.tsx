import * as React from "react";
// @ts-ignore
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { noAuthRoutes, authRoutes } from "./routes";
import NonAuthGuard from "./guards/nonAuthGuard";
import AuthGuard from "./guards/authGuard";
import {RootState} from "../data/redux/store";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../data/redux/hooks";
import {loggedIn, loggingIn, loggingIn2} from "../data/redux/reducers/authReducer";
import { Tracker } from 'meteor/tracker';

const App = () => {
    const auth: boolean = useAppSelector((state: RootState) => {
        return !!state.auth.userId
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        Tracker.autorun(() => {
            dispatch(loggingIn({
                data: Accounts.loggingIn()
            }))
        })
        Tracker.autorun(() => {
            const data = {
                subscriptions:  Meteor.subscribe("users"),
                user: Meteor.user()
            }
            dispatch(loggedIn({
                data: data.user,
            }))
        })
    }, [])

    return (
        <Router>
            <Switch>
                {authRoutes.map((route) => (
                    <AuthGuard
                        roles={[]}
                        key={route.path}
                        component={route.component}
                        auth={auth}
                        {...route}
                        currentRoles={[]}
                    />
                ))}
                {noAuthRoutes.map((route) => (
                        <NonAuthGuard key={route.path} component={route.component} auth={auth} {...route} />
                    ))}
            </Switch>
        </Router>
    );
}

export default App;
