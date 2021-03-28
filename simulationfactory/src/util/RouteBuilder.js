import React from "react";
import {Route, Switch} from "react-router-dom";

let pages = new Map();

/**
   * Registers all of the routes that should lead to the given page
   * @param  {React.Component} page The page to register routes for
   * @param  {String} route The route to register for this page
   * @param  {String} ...aliases All the other routes to register for this page
*/
function RegisterRoutes(page, route, ...aliases) {
    if (page === undefined) {
        throw new Error("page in RouteBuilder.RegisterRoute has not been supplied");
    }
    if (route === undefined) {
        throw new Error("route in RouteBuilder.RegisterRoute has not been supplied");
    }
    let newRoutes = [route, ...aliases];
    for (let newRoute of newRoutes) {
        if (pages.has(newRoute)) {
            throw new Error("RouteBuilder already contains route " + newRoute);
        }
        pages.set(newRoute, page);
    }
}

/**
   * Builds all of the route tags required to link between pages
*/
function BuildRoutes() {
    let routes = [];
    pages.forEach((Value, Key) => routes.push(<Route exact path={Key}><Value/></Route>));
    return <Switch>{routes}</Switch>;
}

export {RegisterRoutes, BuildRoutes}
