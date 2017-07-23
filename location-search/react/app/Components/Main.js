import React from 'react';

// Child components
import Form from "./children/Form";
import Results from "./children/Results";
import History from "./children/History";

// Helper Functions
import helpers from "./utils/helpers.js";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", results: "", history: [] };
  }

  componentDidMount() {
    console.log("COMPONENT MOUNTED");

    helpers.getHistory()
      .then(function (response) {

        let history = response.data
        if (response !== this.state.history) {
          this.setState({ history: history });
        }
    }.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log(data);
          this.setState({ results: data });
          helpers.saveResult({ location: data})
            .then(function () {
              console.log("Posted to MongoDB");
          })
        }
      // bind to refer to this Component and not helpers object
      }.bind(this));
    }
  }

  // Passed as props to Form Component to allow it to update this component (Main) with searchTerms.
  setTerm (term) {
    this.setState({ searchTerm: term });
  };

  render() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">Address Finder!</h2>
            <p className="text-center">
              <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm.bind(this)} />

          </div>

          <div className="col-md-6">

            <Results address={this.state.results} />

          </div>

          <div className="col-md-6">

            <History history={this.state.history} />

          </div>

        </div>

      </div>
    );
  }
}

export default Main;
