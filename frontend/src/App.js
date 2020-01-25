import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Problem from './components/problem/Problem';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/:problemId' component={Problem}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;