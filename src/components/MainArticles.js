import React, { useState, useEffect } from 'react';
import ArticleCard from "./ArticleCard"
import countryData from "./../utilis/sources.json"

function Articles() {
  const [state, setState] = useState({
    articles: null,
    filters: {
      country: "fr",
      category: "business"
    },
    country: [...countryData.country],
    category: [...countryData.category],
    isInGrid: true
  });
  const url = 'https://newsapi.org/v2/';

  const handleChange = element => {
    const newState = {...state};
    newState.filters[element.target.id] = element.target.value
    setState(newState);
  };

  const handleClick = el => {
    const newState = {...state};

    if (el.target.classList[3] === "btn--list") {
      newState.isInGrid = false;
      setState(newState);
    } else {
      newState.isInGrid = true;
      setState(newState);
    }
  }

  useEffect(() => {
    fetch(`${url}top-headlines?country=${state.filters.country}&category=${state.filters.category}&pageSize=50&apiKey=${process.env.REACT_APP_API_KEY_ARTICLES}`)
    .then(response => response.json())
    .then(dataParsed => {
        const newState = {...state};
        newState.articles = [...dataParsed.articles];
        setState(newState);
    })
  }, [state.filters.country, state.filters.category]);

  return (
    <React.Fragment>
      <div className="row">
        <div className="countries col-6 mt-5">
          {
            Object.keys(state.filters).map(key => {
              return (
                <>
                  <label htmlFor={key} className="label--select ml-2 mt-1">{key}</label>
                  <select className="custom-select select" key={key} id={key} onChange={e => handleChange(e)}>
                    {
                      state[key].map(item => {
                        return typeof item === "object" ?
                          <option value={item.value} key={item.value}>{item.content}</option> :
                          <option value={item} key={item}>{item}</option>
                      })
                    }
                  </select>
                </>
              )
              })
            }
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