import React, { Component } from "react";
import { Container, Paper, CircularProgress, Tabs, Tab, Typography, Box } from "@material-ui/core";

import NavBar from "./NavBar";
import MainTable from "./MainTable";

import "./App.css";

const appName = "Natural Hazard Risk Definement System";
const tabPanelStyles = {
    flexGrow: 1
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index} 
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

class App extends Component {
    constructor (...args) {
        super(...args);
        this.state = {
            countries: [],
            value: 0
        };
    }

    getCountries () {
        var req = new XMLHttpRequest();
        req.open("GET", "/risks", true);
        req.send();

        req.onreadystatechange = () => {
            if (req.readyState !== 4) {
                return;
            }

            var json = req.responseText;
            if (json === "1") {
                alert("Error while getting data");
                throw new Error("Error while getting data");
            }

            try {
                json = JSON.parse(json);
            } catch (e) {
                throw new Error("Error while parsing json");
            }

            this.setState({ countries: json });
     
        };
    }

    render() {
        if (this.state.countries.length === 0) {
            this.getCountries();
            return (
                <Paper>
                    <NavBar appName={appName} />
                    <Container className="root-container">
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            size={24}
                            thickness={4}
                        />
                    </Container>
                </Paper>
            );
        }

        const handleChange = (event, value) => {
            this.setState({ value });
        };

        return (
            <Paper className="root-paper">
                <NavBar appName={appName} /> 
                <Container className="root-container">
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.value}
                        onChange={handleChange}
                    >
                        <Tab label="Each country average value" {...a11yProps(0)} />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0} style={tabPanelStyles}>
                        <MainTable risks={this.state.countries} />
                    </TabPanel>
                </Container>
            </Paper>
        );
    }
}

export default App;