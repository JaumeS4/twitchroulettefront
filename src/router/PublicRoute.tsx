import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPublicRoteProps extends RouteProps {
    isAuth: boolean; // is authenticate route
}

const PublicRoute: React.FC<IPublicRoteProps> = ({ isAuth, component, ...rest }) => {
    return isAuth ? (
        <Redirect to='/' />
    ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Route {...rest} component={component} render={undefined} />
    );
};

export default PublicRoute;
