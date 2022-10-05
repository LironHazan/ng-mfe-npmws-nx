import './app.module.scss';
import LoginForm from './LoginForm';
import {useState, useEffect, useCallback} from 'react';

// simple auth client - todo:
function App() {
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchAuthenticated() {
      const response = await fetch('api/authenticated');
      const result = await response.json();
      setMessage(result.message);
      setLoggedIn(result.loggedIn);
    }
    (async () => await fetchAuthenticated())();
  },[loggedIn])

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const result = await response.json();
    setLoggedIn(result.loggedIn);
    setMessage(result.message);
  }, [loggedIn]);

  const logout = async () => {
    const response = await fetch('api/logout');
    const result = await response.json();
    setLoggedIn(result.loggedIn)
    setMessage(result.message);
  }

  return (
      <div className="App">
        <header className="App-header">
          { !loggedIn ? <LoginForm onSubmit={login}/> : null }
          <h1>{loggedIn ? 'Logged In' : 'Not Logged In'}</h1>
          <h2>{message}</h2>
          { loggedIn ? <button onClick={logout}>Logout</button> : null }
        </header>
      </div>
  );
}

export default App;
