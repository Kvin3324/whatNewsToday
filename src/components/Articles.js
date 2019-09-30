import React, { useState, useEffect } from 'react';
import ArticleCard from "./ArticleCard"

function Articles() {
  const [data, setData] = useState({
    articles: null
  });
  const url = 'https://newsapi.org/v2/'
  const apiKey = '2a21202597094d93af09a6cb7822189f';

  useEffect(() => {
    fetch(`${url}top-headlines?country=fr&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => setData({articles: data.articles}))
  }, []);
  console.log(data.articles);

  return (
    <React.Fragment>
      <div className="container container--cards">
        <div className="row">
          { (function() {
            if(data.articles === null) {
              // return <i className="fa fa-spinner"></i>
              return "loading"
            } else{
              return data.articles.map((article, index) => {
                return <ArticleCard urlToImage={article.urlToImage} publishedAt={article.publishedAt} author={article.author} title={article.title} description={article.description} source={article.source.name} url={article.url} key={index} />
              })
            }
          }) ()
        }
        </div>
      </div>
    </React.Fragment>
  );
}

export default Articles