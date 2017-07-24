import React from 'react';

const History = (props) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title text-center">Search History</h3>
      </div>
      <div className="panel-body text-center">

        {/* loop through history in props and return p tag with location and date */}
        {props.history.map((search, i) => {
          return (
            <p key={i}>{search.location} - {search.date}</p>
          );
        })}
      </div>
    </div>
  );
}

export default History;
