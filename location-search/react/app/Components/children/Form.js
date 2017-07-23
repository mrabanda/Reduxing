import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    // Set state associated with input text
    this.state = { term: "" };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Responds to change to user input
  handleChange (event) {
    this.setState({ term: event.target.value });
  };

  // When form is submitted
  handleSubmit (event) {
    event.preventDefault();

    // Call setTerm() which was passed down as props from Main Component
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Location</strong>
              </h4>

              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                name="term"
                onChange={this.handleChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
