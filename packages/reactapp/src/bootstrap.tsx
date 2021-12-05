import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

// ReactDOM.render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>, document.getElementById('root'));

class RealWorldReact extends HTMLElement {

    connectedCallback() {
        ReactDOM.render(
            <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>,
            this,
        );
    }
}

customElements.define('react-app', RealWorldReact);
