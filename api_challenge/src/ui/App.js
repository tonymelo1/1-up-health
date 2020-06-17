import React from 'react';
import '../css/App.css';
import HomePage from './HomePage';
import DataDisplay from './DataDisplay';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(val) {
    this.setState({access_token: val});
  }

  async makeRequest(url) {
    let result = await fetch(url);
    let text = await result.text();
    return text;
  }
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <header className="page-title" role="banner">
            {"1upHealth API Challenge"}
          </header>
        </div>
        <div className="content">
          {!this.state.access_token  
            ? (<HomePage onSubmit={this.handleSubmit}/>) 
            : (<DataDisplay url="http://localhost:3000/everything" access_token={this.state.access_token}/>)
                
          }
        </div>
      </div>
    );
  }

}

export default App;
