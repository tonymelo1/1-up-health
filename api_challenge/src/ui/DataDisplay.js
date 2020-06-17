import React from 'react';
import '../css/DataDisplay.css';
class DataDisplay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.initial_state = {
            display: null,
            request_method: '',
            params: {}
        }
        this.state = this.initial_state;
        this.makeRequest = this.makeRequest.bind(this);
        this.toString = this.toString.bind(this);
    }

    async makeRequest(url, access_token) {
        let result = !access_token 
            ? await fetch(url)
            : await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            });
        let text = await result.json();
        this.setState({display: text});
    }

    toString(obj) {
        if (!obj) {
            return "Nothing to display";
        }
        return (
            <ul>
            {
                Object.keys(obj).map(key => {
                    if (typeof obj[key] === 'object') {
                        return this.toString(obj[key]);
                    }
                    return <li key={key}>{'' + key + ': ' + obj[key]}</li>;
                })
            }
            </ul>
        );
    }

    componentDidMount() {
        this.makeRequest(this.props.url, this.props.access_token);
    }

    render() {
        return (
            <div className="data">
                <header className="results-header">
                    {`Results from $everything query`}
                </header>
                {!this.state.display 
                    ? "Data not loaded" 
                    : this.state.display.entry.map(obj => {
                        return <ul>{this.toString(obj)}</ul>
                    })
                }
            </div>
        );
    }
}

export default DataDisplay;