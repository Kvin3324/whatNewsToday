import React from 'react';
import Header from "./components/Header";
import MainArticles from "./components/MainArticles";
import HeadlineArticles from "./components/HeadlineArticles";
import './App.css';

function App() {
  return (
    <div className="App col-12">
      <div className="container--app">
        <Header />
        <div className="row">
          <div className="col-8 articles--everything">
            <MainArticles />
          </div>
          <div className="col-3 articles--headlines">
            <HeadlineArticles />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
