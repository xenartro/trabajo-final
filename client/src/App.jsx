import Chat from 'components/containers/Chat';
import Start from 'components/containers/Start';
import UserContext from 'components/context/User';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserContext>
      <Router>
        <Route path="/" exact><Start /></Route>
        <Route path="/chat" exact><Chat /></Route>
      </Router>
    </UserContext>
  );
}

export default App;
