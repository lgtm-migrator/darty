/* eslint-env browser */

declare var document: any;

// polyfills
if (global.Promise === undefined) {
    const es6promise = require('es6-promise');

    es6promise.polyfill();
}

if (global.fetch === undefined) {
    require('whatwg-fetch');
}

// react-dom
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

// execute startup
import { appStack, startupArgs } from './appStartup';

const root = appStack.wrapWith(
    children =>
    <Router history={startupArgs.history}>{children}</Router>
);

const targetElement = document.getElementsByTagName('app')[0];
if (targetElement.childNodes.length > 0) {
    ReactDOM.hydrate(root, targetElement);
}
else {
    ReactDOM.render(root, targetElement);
}

// webpack
if (module.hot !== undefined) {
    module.hot.accept(
        (err) => {
            if (err) {
                console.error('Cannot apply HMR update.', err);
            }
        },
        () => ReactDOM.hydrate(root, targetElement),
    );
}
