import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import AdminPage from '../pages/AdminPage';
import SettingsPage from '../pages/SettingsPage';
import LoginPage from '../pages/LoginPage';
import PublicRoute from './PublicRoute';
import { startChecking } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import { RootState } from '../types/state.types';
import RoulettePage from '../pages/RoulettePage';
import LoadingFullScreen from '../components/LoadingFullScreen';
import NewInstanceErrorPage from '../pages/NewInstanceErrorPage';
import VerifyAccountPage from '../pages/VerifyAccountPage';
import ChangelogPage from '../pages/Changelog';
import HelpPage from '../pages/HelpPage';

const AppRouter: React.FC = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { checking, twitchId, verified } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <LoadingFullScreen />;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/login' component={LoginPage} isAuth={!!twitchId} />

                    <PublicRoute
                        exact
                        path='/roulette/:token'
                        component={RoulettePage}
                        isAuth={false}
                    />

                    <PublicRoute
                        exact
                        path='/new-instance'
                        component={NewInstanceErrorPage}
                        isAuth={false}
                    />

                    <PrivateRoute
                        exact
                        path='/settings'
                        component={SettingsPage}
                        isAuth={!!twitchId}
                        verified={verified}
                    />

                    <PrivateRoute
                        exact
                        path='/verify-account'
                        component={VerifyAccountPage}
                        isAuth={!!twitchId}
                        verified={verified}
                    />

                    <PrivateRoute
                        exact
                        path='/changelog'
                        component={ChangelogPage}
                        isAuth={!!twitchId}
                        verified={verified}
                    />

                    <PrivateRoute
                        exact
                        path='/help'
                        component={HelpPage}
                        isAuth={!!twitchId}
                        verified={verified}
                    />

                    <PrivateRoute
                        exact
                        path='/'
                        component={AdminPage}
                        isAuth={!!twitchId}
                        verified={verified}
                    />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
