import React from 'react'
import {Switch , Route} from "react-router-dom"
import  Home  from './views/Home';
import Show from './views/Show';
import ShowDetail from './components/TVShow/TVDetail';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
            <Home/>
            </Route>
            <Route  path="/shows/" component={Show}/>
            <Route  path="/show/:id" component={ShowDetail} />
        </Switch>
    )
}

export default Routes
