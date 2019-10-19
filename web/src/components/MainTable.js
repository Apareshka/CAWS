import React, { Component } from "react";
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { default as allCountriesAndCities} from "all-countries-and-cities-json";

const toArray = i => Array.isArray(i) ? i : i ? [i] : [];
const columns = [
    { id: "country", label: "Country" },
    { id: "risk", label: "Risk" }
];

const allCountries = [];
for (let i in allCountriesAndCities) 
    allCountries.push(i);

class MainTable extends Component {
    constructor (...args) {
        super(...args);
        this.state = {
            country: allCountries,
            sex: "any",
            age: "any"
        };
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
                            {createRow(this.state.country, this.state.sex, this.state.age)}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

function createRow (country, sex, age) {
    country = toArray(country);
    return country.map((country, key) => {
        return (
            <TableRow key={key}>
                <TableCell>
                    {country}
                </TableCell>
                <TableCell>
                    mortality
                </TableCell>
            </TableRow>
        )
    });
}

export default MainTable;