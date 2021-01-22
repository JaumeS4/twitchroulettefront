import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import RoulettePage from '../pages/RoulettePage';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/' component={RoulettePage} />

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
