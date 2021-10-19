import './App.css';
import {useState} from 'react';
import Tasks from './components/Tasks';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
  const [user_id,setUser_id] = useState(null);
  const [page,setPage] = useState('login');
  
  const handleUserId = (id)=>{
    setUser_id(id);
    setPage('tasks');
  }

  const switchPage=(destination)=>{
    setPage(destination);
  }

  const switchComponent = ()=>{
    switch(page){
      case "login":return <LoginForm onLogin={handleUserId} navToSignUp={switchPage}/>;
      case "register":return <SignUpForm onSignUp={handleUserId} navToLogin={switchPage}/>;
      case "tasks":return <Tasks user_id={user_id}/>;
      default:return <LoginForm onLogin={handleUserId} navToSignUp={switchPage}/>;
    }
  }

  return (
    <div className="App">
      {switchComponent()}
    </div>
  );
}

export default App;
