import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import createDonor from './pages/createDonor';


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/createDonor" component={createDonor}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;