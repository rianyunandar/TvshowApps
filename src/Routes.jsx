import React from 'react'
import {Switch , Route} from "react-router-dom"
import  Home  from './views/Home';
import Show from './views/Show';
import ShowDetail from './components/TVShow/TVDetail';

import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import Loading from './components/loading';

const Routes = () => {
    const { isLoading } = useAuth0();
  
    if (isLoading) {
      return <Loading />;
    }


    return (
        <Switch>
            <Route exact path="/">
            <Home/>
            </Route>
            <ProtectedRoute  path="/shows/" component={Show}/>
            <ProtectedRoute  path="/show/:id" component={ShowDetail} />
        </Switch>
    )
}

export default Routes
