import './App.css';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
// Custom Components
import Login from './account_components/Login';
import SignUp from './account_components/SignUp';
import Todos from './todos_components/Todos';

function App() {
  const [user_id,setUserId] = useState(null);
  const onUserId = (id)=>setUserId(id);
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <Login onUserId={onUserId}/>
            </Route>
            <Route path="/sign-up">
              <SignUp/>
            </Route>
            <Route path="/todos">
              <Todos/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
