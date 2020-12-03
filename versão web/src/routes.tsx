import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import HeroesList from './pages/HeroesList';
import HeroDetails from './pages/HeroDetails'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/v1/public/characters" exact component={HeroesList} />
            <Route path="/v1/public/characters/:id" component={HeroDetails} />
        </BrowserRouter>

    );
}

export default Routes;