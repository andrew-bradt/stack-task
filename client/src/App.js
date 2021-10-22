import './App.css';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
// Custom Components
import Login from './account_components/Login';
import SignUp from './account_components/SignUp';
import Todos from './todos_components/Todos';
import Layout from './containers/Layout';
function App() {
  // Hooks
  const [user_id,setUserId] = useState(null);
  const [mountComponent, setMountComponent] = useState('login');
  // Handlers
  const onUserId = (id)=>{
    setUserId(id);
    (id)?setMountComponent('todos'):setMountComponent('login');
  };

  return (
    <div className="App">
        <Layout user_id={user_id} onUserId={onUserId} onSignOut={setMountComponent}>
              <Login onUserId={onUserId} toSignUp={setMountComponent}/>
              <SignUp onUserId={onUserId} toLogin={setMountComponent}/>
              <Todos user_id={user_id}/>
        </Layout>
    </div>
  );
}

export default App;
