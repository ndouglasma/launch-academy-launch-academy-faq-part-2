import React, { Component } from "react";
import { Link } from "react-router";

class LauncherShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      bio: ""
    };
  };

  componentDidMount(){
    let launcherId = this.props.params.id;

    fetch(`/api/v1/launcher/${ launcherId }`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          name: body.name,
          bio: body.bio
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  render(){
    return(
      <div>
        <p>{ this.state.name }</p>
        <p>{ this.state.bio }</p>
        <Link to={"/launchers"}>Back to Launchers</Link>
      </div>
    );
  };
};

export default LauncherShow;
