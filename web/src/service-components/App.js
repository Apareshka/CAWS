import React, { Component } from "react";
import { Container, Paper } from "@material-ui/core";

import NavBar from "./NavBar";
import MainTable from "./MainTable";

import "./App.css";

const appName = "Natural Hazard Risk Definement System";

class App extends Component {
    render() {
        return (
            <Paper>
                <NavBar appName={appName} /> 
                <Container maxWidth="md" className="root-container">
                    <Paper style={{
                        padding: "10pt"
                    }}>
                        <MainTable />
                    </Paper>
                </Container>
            </Paper>
        );
    }
}

export default App;