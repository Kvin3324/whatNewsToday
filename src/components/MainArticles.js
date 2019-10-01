import React, { useState, useEffect } from 'react';
import ArticleCard from "./ArticleCard"
import countryData from "./../utilis/sources.json"

function Articles() {
  const [state, setState] = useState({
    articles: null,
    filters: {
      country: "fr",
      // category: "business"
    },
    country: [...countryData.country],
    isInGrid: true
  });
  const url = 'https://newsapi.org/v2/'
  const apiKey = '2a21202597094d93af09a6cb7822189f';

  const handleChange = element => {
    const newState = {...state};

    Object.keys(state.filters).map(lg => {
      if (element.target.value === lg) {
        newState.filters[lg] = element.target.value;
      }
    });

    fetch(`${url}top-headlines?country=${state.filters.country}&apikey=${apiKey}`)
    .then(data => data.json())
    .then(dataParsed => {
      newState.articles = [...dataParsed.articles];
      setState(newState);
    });
  };

  const handleClick = element => {
    const newState = {...state};
    if (element.target.classList[3] === "btn--list") {
      newState.isInGrid = false
      console.log(newState.isInGrid);

      setState(newState);
    } else {
      newState.isInGrid = true;
      setState(newState);
    }
  }

  useEffect(() => {
    // fetch(`${url}top-headlines?country=fr&apiKey=${apiKey}`)
    // fetch(`${url}everything?domains=lemonde.fr&apiKey=${apiKey}`)
    fetch(`${url}top-headlines?country=${state.filters.country}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(dataParsed => {
        const newState = {...state};
        newState.articles = [...dataParsed.articles];
        setState(newState);
    })
  }, []);
  console.log(state.articles);

  return (
    <React.Fragment>
      <div className="row">
        <div className="countries col-6 mt-5">
          <label htmlFor="select--country" className="label--select--country mr-2">Country</label>
          <select className="custom-select select--country" onChange={e => handleChange(e)}>
            {
              state.country.map(item => {
                return <option value={item.value} key={item.value}>{item.content}</option>
              })
            }
          </select>
        </div>
        <div className="buttons--render mt-5">
          <button type="button" className="btn btn-primary btn-sm btn--grid" onClick={e => handleClick(e)}><i className="fas fa-grip-horizontal mr-1"></i>Grid</button>
          <button type="button" className="btn btn-secondary btn-sm btn--list" onClick={e => handleClick(e)}><i className="fas fa-bars mr-1"></i>List</button>
        </div>
      </div>
      <div className="container container--cards">
        <div className="row">
          { (function() {
            if(state.articles === null) {
              return <i className="fa fa-spinner"></i>
            } else{
              return state.articles.map((article, index) => {
                return (
                  <div className={`${state.isInGrid ? "col-4 article--cards--grid" : "col-12 article--cards--list"}`} key={index} >
                    <ArticleCard urlToImage={article.urlToImage} publishedAt={article.publishedAt} author={article.author} title={article.title} description={article.description} source={article.source.name} url={article.url} key={index} />
                  </div>
                )
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