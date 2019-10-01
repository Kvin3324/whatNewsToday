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
    // data: []
  });
  const url = 'https://newsapi.org/v2/'
  const apiKey = '2a21202597094d93af09a6cb7822189f';

  const handleChange = element => {
    const newState = {...state};

    Object.keys(state.filters).map(lg => {
      console.log(element.target.value);
      console.log(newState.filters[lg] = element.target.value);

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

  // useEffect(() => {
  //   // fetch(`${url}top-headlines?country=fr&apiKey=${apiKey}`)
  //   // fetch(`${url}everything?domains=lemonde.fr&apiKey=${apiKey}`)
  //   fetch(`${url}top-headlines?country=${state.filters.country}&apiKey=${apiKey}`)
  //   .then(response => response.json())
  //   .then(data => setState({articles: data.articles}))
  // }, []);
  // console.log(state.articles);

  useEffect(() => {
    // fetch(`${url}top-headlines?country=fr&apiKey=${apiKey}`)
    // fetch(`${url}everything?domains=lemonde.fr&apiKey=${apiKey}`)
    fetch(`${url}top-headlines?country=${state.filters.country}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(dataParsed => {
        const newState = {...state};

        newState.articles = [...dataParsed.articles];
        console.log(newState.articles);

        // newState.articles = dataParsed.articles;
        setState(newState);
    })
  }, []);
  console.log(state.articles);

  return (
    <React.Fragment>
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
      <div className="container container--cards">
        <div className="row">
          { (function() {
            if(state.articles === null) {
              // return <i className="fa fa-spinner"></i>
              return "loading"
            } else{
              return state.articles.map((article, index) => {
                return (
                  <div className="col-xl-4 col-sm-6">
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