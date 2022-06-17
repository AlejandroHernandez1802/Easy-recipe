import React from 'react';
import './App.css';
import RolePage from './Pages/RolePage/RolePage';
import LoginAdminPage from './Pages/AdminPage/LoginAdminPage';
import RegisterAdminPage from './Pages/AdminPage/RegisterAdminPage';
import HomePage from './Pages/Home/HomePage';
import RecipesPage from './Pages/Recipes/RecipesPage';
import SelectedRecipePage from './Pages/SelectedRecipe/SelectedRecipePage';
import UserManual from './Components/UserManual/UserManual';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends React.Component{

  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
          <Route path="/role-selection" component={RolePage}/> 
           <Route path="/login-admin" component={LoginAdminPage}/> 
            <Route path="/register-admin" component={RegisterAdminPage}/> 
            <Route path="/homepage" component={HomePage}/> 
            <Route path="/recipes" component={RecipesPage}/>
            <Route path="/selected-recipe" component={SelectedRecipePage}/>
            <Route path="/user-manual" component={UserManual}/>
            <Redirect exact from = "/" to="/role-selection"/>
          </Switch>
        </Router>
      </div> 
    );
  }

}

export default App;
