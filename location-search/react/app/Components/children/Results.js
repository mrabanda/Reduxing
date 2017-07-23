import React from 'react';

const Results = (props) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title text-center">Results</h3>
      </div>
      <div className="panel-body text-center">
        <h1>Address:</h1>
        <p>{props.address}</p>
      </div>
    </div>
  );
}

export default Results;
