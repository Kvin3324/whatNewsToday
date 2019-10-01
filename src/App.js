import React from 'react';
import Header from "./components/Header";
import MainArticles from "./components/MainArticles";
import HeadlineArticles from "./components/HeadlineArticles";

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App col-12">
      <Header />
      <div className="row">
        <div className="col-9 articles--everything">
          <MainArticles />
        </div>
        <div className="col-3 articles--headlines">
          <HeadlineArticles />
        </div>
      </div>
    </div>
  );
}

export default App;
