import React from 'react';
import Child from "./Child";

// Import helper for making API calls
import helpers from "../utils/helpers";

// Create the Parent Component
class Parent extends React.Component {
  constructor(props) {
    super(props);
    // Set state associated with the number of clicks
    this.state = {
      clicks: 0,
      clickID: "El jefe"
    };
  }

  // On load display the number of clicks
  componentDidMount() {
    console.log("COMPONENT MOUNTED");

    // After component renders retrieve the click count from DB.
    helpers.getClicks()
      .then(function(response) {
        // If data exists in our DB set newclicks = data.length, else set new clicks = 0
        let newClicks = response.data.length ? response.data[0].clicks : 0;
        this.setState({
          clicks: newClicks
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newClicks);
      }.bind(this));
  }

  // When component updates compare previous state
  componentDidUpdate(prevState) {
    console.log("COMPONENT UPDATED");

    // We will check if the click count has changed...
    if (prevState.clicks !== this.state.clicks) {

      // If it does, then update the clickcount in MongoDB
      helpers.saveClicks({ clickID: this.state.clickID, clicks: this.state.clicks })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  }

  // Add to the clickCounter
  handleClick() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  // Reset the clickCounter
  resetClick() {
    this.setState({ clicks: 0 });
  }

  // Here we render the function
  render() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2>Reactive Components</h2>
            <hr />
            <p>
              <em>With MongoDB</em>
              Vist the <a href="/api">/api</a> to see the data.
            </p>
            <p>
              {/* Button for adding clicks */}
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={() => this.handleClick()}
              >
                CLICK ME!!!!
              </button>
              {/* Button for resetting clicks */}
              <button
                className="btn btn-danger btn-lg"
                type="button"
                onClick={() => this.resetClick()}
              >
                Reset
              </button>
            </p>
          </div>

          <div className="col-md-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Parent</h3>
              </div>
              <div className="panel-body text-center">

                {/* Displays click count for the parent */}
                <h1>{this.state.clicks}</h1>

                {/* Render Child component with 'clicks' property equal to the state of the parents clicks */}
                <Child clicks={this.state.clicks} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Parent;
