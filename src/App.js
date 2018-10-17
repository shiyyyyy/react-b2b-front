import React, { Component } from 'react';
import logo from './logo.svg';
import { renderRoutes } from 'react-router-config';
import './App.css';
import { routes } from './pages'

class App extends Component {
  render() {
    return (
        <div className="App">
          {renderRoutes(routes)}
        </div>
    );
  }
}

export default App;
