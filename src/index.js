import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss, Route } from 'react-router';

import './css/style.css';

import App from './components/App';

import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
    return (
        //Router needs to passed all the way down to children components
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Match exactly pattern="/" component={StorePicker} />
                <Match pattern="/store/:storeId" component={App} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));
