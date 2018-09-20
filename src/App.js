import React, { Component } from 'react';
import './App.css';
import Game from './Game'
import './Stars.css';
import Rules from './Rules';
import { Route,HashRouter} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route path="/rules" component={Rules} />
          <Route exact path="/" component={Game} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
