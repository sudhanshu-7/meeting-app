import React from "react";
import SignUp from "./signUp";
import {AuthProvider} from '../contexts/AuthContext'
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Forgot from './forgot'
import {BrowserRouter as Router , Switch , Redirect , Route} from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import './App.css'
function App() {
  const g =  useAuth()
  console.log(g)
  let routes = (
    <Router>
      <AuthProvider>
        
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/forgot"><Forgot/></Route>
          <Redirect to="/dashboard" />
        </Switch>
    </AuthProvider>
      </Router>
  )
  return (
    
    <div >
      {routes}
    </div>
  );
}

export default App;
