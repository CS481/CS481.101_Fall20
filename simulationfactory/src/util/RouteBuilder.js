import React from "react";
import {Route, Switch} from "react-router-dom";

let pages = new Map();

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

function BuildRoutes() {
    return function() {
        let routes = [];
        pages.forEach((Value, Key) => routes.push(<Route exact path={Key}><Value/></Route>));
        return <Switch>{routes}</Switch>;
    }
}

export {RegisterRoutes, BuildRoutes}