import React, { useState, useEffect } from 'react';
import ArticleCard from "./ArticleCard"

function HeadlinesArticles() {
  const [data, setData] = useState({
    articles: null
  });
  const url = 'https://newsapi.org/v2/'

  useEffect(() => {
    fetch(`${url}everything?domains=lemonde.fr&apiKey=${process.env.REACT_APP_API_KEY_ARTICLES}`)
    .then(response => response.json())
    .then(data => setData({articles: data.articles}))
  }, []);

  return (
    <React.Fragment>
    <h3 className="card--articles--headlines--title">By Le Monde:</h3>
      { (function() {
        if(data.articles === null) {
          return <i className="fa fa-spinner"></i>
        } else{
          return data.articles.map((article, index) => {
            return (
              <div className="col-10 col-xs-10 card--articles--headlines" key={index}>
                <ArticleCard urlToImage={article.urlToImage} publishedAt={article.publishedAt} author={article.author} title={article.title} source={article.source.name} url={article.url} key={index} />
              </div>
            )
          })
        }
        }) ()
      }
    </React.Fragment>
  );
}

export default HeadlinesArticles