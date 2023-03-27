import React from "react";
import './home-pagination.css'

export default function HomePagination(props) {
  
  return (
    <div className="homePaginationContainer">
        {Array.from(Array(props.numberOfPage), (item, index) => {
          return (
            <button className="homePaginationButton"
              key={index}
              value={index}
              onClick={(e) => {
                props.setCurrentPage(Number(e.target.value));
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
  )
}