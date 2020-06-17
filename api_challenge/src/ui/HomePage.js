import React from 'react';
import '../css/HomePage.css';

class TokenSubmissionForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Maintain value in text input
    handleChange(e) {
        this.setState({value: e.target.value});
    }

    //Send value back to the HomePage component
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
    }

    render() {
        return (
            <form className="token_form" onSubmit={this.handleSubmit}>
                <label htmlFor="token">
                    Enter your token: 
                    <input type="text" 
                        name="token" 
                        placeholder="Enter a token" 
                        value={this.state.value}
                        onChange={this.handleChange}
                        maxLength={100}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}
class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Handle empty submission, send value back to the app
    handleSubmit(val) {
        if (!val) {
            alert("You must submit a token!");
            return;
        }
        this.setState({submitted: true});
        this.props.onSubmit(val);
    }
    render() {
        return (
            <div className="home-page">
                <header className="no-token-header"> 
                    {'Provide an access token to begin displaying data'}
                </header>
                <TokenSubmissionForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default HomePage;