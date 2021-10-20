import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              Login
            </Route>
            <Route path="/sign-up">
              Sign Up
            </Route>
            <Route path="/todos">
              Todos
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
