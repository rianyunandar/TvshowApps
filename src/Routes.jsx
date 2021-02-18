import React from 'react'
import {Switch , Route} from "react-router-dom"
import  {Home}  from './views/Home';
import Show from './views/Show';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
            <Home/>
            </Route>
            <Route  path="/show" component={Show}/>
        </Switch>
    )
}

export default Routes
