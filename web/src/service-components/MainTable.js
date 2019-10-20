import React, { Component } from "react";
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";

const toArray = i => Array.isArray(i) ? i : i ? [i] : [];
const columns = [
    { id: "country", label: "Country" },
    { id: "risk", label: "Risk" }
];

class MainTable extends Component {
    constructor (...args) {
        super(...args);
        this.state = {
            risks: []
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

            this.setState({ risks: json });
        }
    }

    createRows () {
        return this.state.risks.map((risk) => {
            return (
                <TableRow key={risk.id}>
                    <TableCell>
                        {risk.country}
                    </TableCell>
                    <TableCell>
                        {risk.risk}%
                    </TableCell>
                </TableRow>
            )
        });
    }

    render () {
        return (
            <Paper>
                <div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.createRows()}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}


export default MainTable;