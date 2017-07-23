import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    // Set state for initial num1, num2, and input text
    this.state =  { num1: 0, num2: 0, text: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  // Responds to change to user input
  handleChange(event) {
    let newState = {
      [event.target.name]: event.target.value
    };
    console.log('state', newState);
    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2>Form Capture</h2>
            <p>
              <em>Type numbers and text in the appropriate boxes.</em>
            </p>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Form</h3>
              </div>
              <div className="panel-body text-center">
                <form>
                  <div className="form-group">
                    <h4 className="">
                      <strong>Number 1</strong>
                    </h4>

                    <input
                      type="number"
                      value={this.state.num1}
                      className="form-control"
                      name="num1"
                      onChange={this.handleChange}
                      required
                    />

                    <h4>
                      <strong>Number 2</strong>
                    </h4>
                    <input
                      type="number"
                      value={this.state.num2}
                      className="form-control"
                      name="num2"
                      onChange={this.handleChange}
                      required
                    />

                    <h4>
                      <strong>Random Text</strong>
                    </h4>
                    <input
                      type="text"
                      value={this.state.text}
                      className="form-control"
                      name="text"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Results</h3>
              </div>
              <div className="panel-body text-center">
                <form>
                  <div className="form-group">
                    <h2>
                      {this.state.num1} + {this.state.num2} =
                      {Number(this.state.num1) + Number(this.state.num2)}
                    </h2>
                    <h2>
                      {this.state.text} Reversed: {this.state.text.split("").reverse().join("")}
                    </h2>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Form;
