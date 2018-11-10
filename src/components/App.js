import React, { Component, Fragment } from 'react';
import '../App.css';
import { Header, Footer } from './Layouts';
import Exercises from './Exercises';

class App extends Component {
  render() {
    return (
      <Fragment>
       <Header />
       <Exercises hello={ 'hi darou' } />
       <Footer />
      </Fragment>
    );
  }
}


export default App;
