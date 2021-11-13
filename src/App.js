
import './App.css';
import Course from './components/Course/Course';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import CreateCourse from './components/Course/CreateCourse';
import Login from './components/auth/Login';
import PrivateRoute from './PrivateRoute';
import User from './components/users/User';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/Login" component={Login} />
        <PrivateRoute  exact path="/" component={Course} />
        <PrivateRoute exact path="/instructor" component={User}/>

      </Switch>

    </div>
  );
}

export default App;
