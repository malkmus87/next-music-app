/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'components/AppView';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import './index.css';
import Wrapper from 'components/Wrapper';

function Index() {
  return (
    <div className="test">
      <Provider store={store}>
        <Wrapper>
          <Router>
            <Route
              path="/"
              component={(props : any) => <App {...props} />}
            />
          </Router>
        </Wrapper>
      </Provider>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
