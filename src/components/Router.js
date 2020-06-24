import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            {/* When the extact path matches /, use component StorePicker */}
            <Route exact path="/" component={StorePicker} />

            {/* When the extact path matches /store/123, use component App */}
            <Route path="/store/:storeId" component={App} />

            {/* Else load our Not Found compoenent */}
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Router;
