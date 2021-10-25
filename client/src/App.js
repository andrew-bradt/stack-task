import './App.css';
import {useState,useEffect} from 'react';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
// MUI Styling

// Custom Components
import {ThemeProvider} from '@material-ui/styles';
import Login from './account_components/Login';
import SignUp from './account_components/SignUp';
import Todos from './todos_components/Todos';
import Layout from './containers/Layout';

let theme = createMuiTheme({
});
theme=responsiveFontSizes(theme);

function App() {
  // Hooks
  const [user_id,setUserId] = useState(null);
  const [mountComponent, setMountComponent] = useState('login');
  // Handlers
  const onUserId = (id)=>{
    setUserId(id);
    (id)?setMountComponent('todos'):setMountComponent('login');
  };
  const swapComponents = (page)=>{
    switch(page){
      case 'login':
        return <Login onUserId={onUserId} toSignUp={setMountComponent}/>;
      case 'sign-up':
        return <SignUp onUserId={onUserId} toLogin={setMountComponent}/>;
      case 'todos':
        return <Todos user_id={user_id}/>;
    }
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout user_id={user_id} onUserId={onUserId} onSignOut={setMountComponent}>
          {swapComponents(mountComponent)}
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
