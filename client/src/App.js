import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import axios from 'axios';

function App() {
  /* 
    Headers All App
   */
  let token = localStorage.getItem('token');
  axios.defaults.headers.common = {'Authorization': token};
  
  return (
    <Router>
      <div>
        <Header/>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/post/create" component={CreatePost}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/post/view/:id" component={ViewPost} />
            <Route path="/post/edit/:id" component={EditPost} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
