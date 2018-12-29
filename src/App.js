import React, { Component } from 'react';
import './App.css';
import PersonList from './Components/PersonList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>testing</h1>
        <PersonList />
      </div>
    );
  }
}

export default App;
