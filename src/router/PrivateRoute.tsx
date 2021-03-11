import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
    isAuth: boolean; // is authenticate route
    verified: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ isAuth, verified, component, ...rest }) => {
    if (isAuth) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        if (verified) return <Route {...rest} component={component} render={undefined} />;

        const { path } = { ...rest };

        if (path === '/verify-account')
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Route {...rest} component={component} render={undefined} />;

        return <Redirect to='/verify-account' />;
    }

    return <Redirect to='/login' />;
};

export default PrivateRoute;
