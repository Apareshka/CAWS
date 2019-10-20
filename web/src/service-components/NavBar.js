import React, { Component } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";

class NavBar extends Component {
    render() {
        return (
            <AppBar position="static" style={{
                minHeight: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "1.2em",
                    color: (this.props.color || "#f5f5f5"),
                    letterSpacing: "0.1em",
                    fontWeight: "bold"
                }}>
                    {this.props.appName}
                </div>
            </AppBar>
        );
    }
}

export default NavBar;