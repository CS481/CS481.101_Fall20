import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

import {BuildRoutes} from './util/RouteBuilder';

/*  This is the only real weirdness with my solution. You MUST import all of the pages here, or the routes will not be built
    Fortunately, importing for side effects isn't entirely unheard of *cough* jsx *cough* 
*/
import HomePage from './pages/Homepage';
import FactoryPage from './pages/Factorypage';
import PlayerPage from './pages/Playerpage';
import LoginSignUpPage from './pages/Loginsignuppage';
import AccountPage from './pages/Accountpage';
import AboutPage from './pages/Aboutpage'
import { ThemeProvider } from '@material-ui/core';
import { Theme } from "./util/Stylesheet"

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={ Theme }> 
          <BrowserRouter>
            <BuildRoutes/>
          </BrowserRouter>
      </ThemeProvider>
    );
  }
}
export default App