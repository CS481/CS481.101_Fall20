import React, { Component } from 'react'
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Homepage from './pages/Homepage'
import FactoryPage from './pages/Factorypage'
import PlayerPage from './pages/PlayerPage'
import Navbar from './components/Navbar'
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <Switch>
          {/* We have to register all or our routes in this manner. 
              I would like to manage all of this with a RouteBuilder.
              E.G., when a page is imported, it registers all of it's routes with the RouteBuilder.
              Here, we would simply call RouteBuilder.build() or whatever, and it would generate all of these Route tags for us.
              Check out Navbar.js to see an how to include a link into a page.
          */}
          <Route exact path="/factory"><FactoryPage/></Route> 
          <Route exact path="/"><Homepage/></Route>
          <Route exact path="/home"><Homepage/></Route>
          <Route exact path="/player"><PlayerPage/></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App