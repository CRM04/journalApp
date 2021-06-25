import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { getNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setchecking] = useState(true);
    const [isAuth, setisAuth] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(login(user.uid, user.displayName));
                dispatch(getNotes(user.uid));
                setisAuth(true);
            } else {
                setisAuth(false);
            }
            setchecking(false);
        });
    }, [dispatch]);

    if (checking) {
        return (
            <h1>Cargando...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path='/auth' component={AuthRouter} isAuth={isAuth} ></PublicRoute>
                    <PrivateRoute path='/' component={JournalScreen} isAuth={isAuth} ></PrivateRoute>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
