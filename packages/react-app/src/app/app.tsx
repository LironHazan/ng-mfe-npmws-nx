
import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

import { Route, Link } from 'react-router-dom';

const channel = 'test_channel'

const broadcast = () => {
  const bc = new BroadcastChannel(channel);
  bc.postMessage('Im uppppppp!');
}

export function App() {

  return (
    <div className={styles.app}>
      I'm a React micro app!
      <br/>
      I live inside angular
    <br/>
    <br/>
      <button onClick={broadcast}> Broadcast to: test_channel </button>
    <div role="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page-2">Page 2</Link></li>
      </ul>
    </div>
    <Route
      path="/"
      exact
      render={() => (
        <div>This is the generated root route. <Link to="/page-2">Click here for page 2.</Link></div>
      )}
    />
    <Route
      path="/page-2"
      exact
      render={() => (
        <div><Link to="/">Click here to go back to root page.</Link></div>
      )}
    />
    {/* END: routes */}
    </div>
  );

}


export default App;
