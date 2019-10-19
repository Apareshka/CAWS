import React, { Component } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";

class NavBar extends Component {
    render() {
        return (
            <AppBar position="static">
                <div style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "0.8em",
                    padding: "10pt",
                    color: (this.props.color || "#ccc"),
                    letterSpacing: "0.5pt",
                    fontWeight: "bold"
                }}>
                    {this.props.appName}
                </div>
            </AppBar>
        );
    }
}

export default NavBar;