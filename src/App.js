import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import News from './components/News'

import { BrowserRouter as Router, Route,  Switch} 
        from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <Router>
      <>
      <div>
        
        <NavBar/>
        <Switch>
          <Route exact path='/'><News key="general" pageSize={15} country='in' category="general"/></Route>
          <Route exact path='/sports'><News key="sports" pageSize={15} country='in' category="sports"/></Route>
          <Route exact path='/business'><News key="buissness" pageSize={15} country='in' category="business"/></Route>
          <Route exact path='/entertainment'><News key="entertainment" pageSize={15} country='in' category="entertainment"/></Route>
          <Route exact path='/health'><News key="health" pageSize={15} country='in' category="health"/></Route>
        </Switch>
      </div>
      </>
      </Router>
    )
  }
}
