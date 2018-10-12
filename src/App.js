import React, { Component } from 'react';
import logo from './logo.svg';


import './App.css';

// import Layout from './pages/layout';
import Personal from './pages/Personal';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Personal></Personal>
        </div>
    );
  }
}

export default App;
