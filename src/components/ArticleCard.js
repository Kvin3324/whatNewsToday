import React from "react";
import Moment from 'react-moment';

function ArticleCard(props) {
  return (
    <div className="card">
      <a href={`${props.url}`} target="blank" className="card--link--source">
        <div className="card-body">
          <div className="card--img">
            {
              props.urlToImage === null ?
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png" className="card-img-list" alt="..."/>
                : <img src={`${props.urlToImage}`} className="card-img-list" alt="..."/>
            }
          </div>
          <div className="row mt-2 mb-2 card--date--author">
            <div className="card--date col-6">
              <Moment format="DD/MM/YYYY">
                {`${props.publishedAt}`}
              </Moment>
            </div>
            <div className="card--author col-6">
              <p className="card--author--name">{props.author}</p>
            </div>
          </div>
          <div className="card--about">
            <h5 className="card-title">{props.title}</h5>
            <div className="card-description">
              {
                props.description && props.description.length > 40 ?
                <p>{props.description.substr(0, 100)}... <a href={`${props.url}`} target="blank"> Read more</a></p> :
                <p>{props.description}</p>
              }
            </div>
          <div className="card--source">
            <strong>
              <p>{props.source}</p>
            </strong>
              </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default ArticleCard