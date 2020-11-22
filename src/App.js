import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import GenreGrid from './components/genreGrid';
import BookCatlog from './components/bookCatlog';
// import Book from './components/bookCatlog';
// import NotFound from './components/notFound';
import './App.css';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
     
      <React.Fragment>
        <Switch>
          <Route path="/gutenberg" component={GenreGrid} />
          <Route path="/books" component={BookCatlog} />
          <Route path="/" component={GenreGrid} />
          {/* <Redirect from="/" exact to="/gutenberg" /> */}
        </Switch>
      </React.Fragment>
      
      </div>
     );
  }
}
 
export default App;


