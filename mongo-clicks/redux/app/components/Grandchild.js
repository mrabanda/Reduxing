import React from 'react';

// Create the GrandChild Component
class GrandChild extends React.Component {
  constructor(props) {
    super(props);
    // Child has a state that follows the number of clicks
    this.state = { number: 0};
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">GrandChild</h3>
        </div>
        <div className="panel-body text-center">

          {/* This component will multiply it's own number on "this.state" with it's parent's
          number on "this.props" and then display the result in the <h1> tag */}
          <h1>{this.state.number + 4 * this.props.number}</h1>
        </div>
      </div>
    );
  }
};

export default GrandChild;
