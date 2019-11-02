import React from 'react';
import BlogForm from './components/form/form.component';
import List from './components/list/list.component';
import Header from './components/header/header.component';
import './App.css';
import {Route,Switch} from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <Switch>
          <Route path='/blogform' component={BlogForm} />
          <Route path='/' exact component={List} />
      </Switch>
    </div>
  );
}

export default App;
