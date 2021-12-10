import styles from './app.module.scss';
import { Route, Link } from 'react-router-dom';
import {Circle} from "./nested/circle";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DataTable from "./nested/data-grid";
import {Channel, SimpleEventEmitter} from "../../../shared/simple-event-emitter/src";

const broadcast = () => {
  const channel =  SimpleEventEmitter.init(Channel.TestChannel);
    channel.broadcast('Im uppppppp!');
}

export function App() {

  return (
    <div className={styles.app}>
      <div className={styles.header}>
          <div> I'm a React micro app! I live inside Angular
          </div>
          <FavoriteIcon className={styles.transIc}/>
          <div className={styles.transIc}></div>
      </div>
        <Button variant="text" color="primary" onClick={broadcast}>
            Broadcast to: test_channel
        </Button>
    <div role="navigation">
      <ul>
        <li><Link to="/react_app">Home</Link></li>
        <li><Link to="/react_app/page-2">Page 2</Link></li>
      </ul>
    </div>
    <Route
      path="/react_app"
      exact
      render={() => (
        <div>
            <Link to="/react_app/page-2">Click here for page 2.</Link>
        </div>
      )}
    />
    <Route
      path="/react_app/page-2"
      exact
      render={() => (
        <div>
            <div className={styles.routerlink}> <Link to="/react_app">Click here to go back to root page.</Link> </div>
            <DataTable/>
        </div>
      )}
    />
    </div>
  );

}


export default App;
