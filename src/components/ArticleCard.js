import React from "react";
import Moment from 'react-moment';

function ArticleCard(props) {
    return (
      // <div className="col-xl-4 col-sm-6">
        <div className="article--card">
          <div className="card">
            <div className="card-body">
              <div className="card--img">
                <img src={`${props.urlToImage}`} className="card-img-list" alt="..."/>
              </div>
              <div className="row mb-4">
                <div className="card--date col-6">
                  <Moment format="DD/MM/YYYY">
                    {`${props.publishedAt}`}
                  </Moment>
                </div>
                <div className="card--author col-6">
                  <p>{props.author}</p>
                </div>
              </div>
                <h5 className="card-title">{props.title}</h5>
                <p>{props.description}</p>
              <div className="card--source">
                <p>{props.source}</p>
              </div>
              <div className="card--url">
                <a href={`${props.url}`}>{props.url}</a>
              </div>
            </div>
          </div>
        </div>
      // </div>
    )
}

export default ArticleCard