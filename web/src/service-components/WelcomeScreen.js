import React, { Component } from "react";

class WelcomeScreen extends Component {
    render () {
        return (
            <div className="root-intro centered">
                <h2 style={{
                    fontSize: "1.5em"
                }}>{this.props.appName}</h2>
                <p>{this.props.text}</p>
            </div>
        );
    }
}

export default WelcomeScreen;