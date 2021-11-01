import './App.css';
import {useState} from 'react';
// MUI Styling
import theme from './components/ui/Theme';
import {ThemeProvider} from '@material-ui/styles';
// Custom Components
import Login from './components/account_components/Login';
import Layout from './components/containers/Layout';
import SignUp from './components/account_components/SignUp';
import Todos from './components/todos_components/Todos';
//
function App() {
  // Hooks
  const [user_id,setUserId] = useState(null);
  const [mountComponent, setMountComponent] = useState('login');
  const [searchText, setSearchText] = useState('');
  // Handlers
  const onUserId = (id)=>{
    setUserId(id);
    (id)?setMountComponent('todos'):setMountComponent('login');
  };
  const onSearchChange = (e)=>{
    const {value} = e.target;
    setSearchText(value);
  }
  const swapComponents = (page)=>{
    switch(page){
      case 'login':
        return <Login onUserId={onUserId} toSignUp={setMountComponent}/>;
      case 'sign-up':
        return <SignUp onUserId={onUserId} toLogin={setMountComponent}/>;
      case 'todos':
        return <Todos user_id={user_id} searchText={searchText}/>;
      default:
        return <Login onUserId={onUserId} toSignUp={setMountComponent}/>;
    }
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout user_id={user_id} onUserId={onUserId} onSignOut={setMountComponent} onSearchChange={onSearchChange}>
          {swapComponents(mountComponent)}
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
