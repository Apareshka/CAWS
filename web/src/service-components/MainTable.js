import React, { Component } from "react";
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TextField, Container, TablePagination } from "@material-ui/core";

const toArray = i => Array.isArray(i) ? i : i ? [i] : [];
const columns = [
    { id: 0, label: "Country" },
    { id: 1, label: "Risk" }
];


class MainTable extends Component {
    constructor (...args) {
        super(...args);
        this.state = {
            filter: "",
            order: "asc",
            orderBy: 0,
            rowsPerPage: 5,
            page: 0
        };
    }    

    render () {
        var {order, orderBy, page, rowsPerPage} = this.state;

        var risks = this.props.risks.filter(val => val.country.toString().startsWith(this.state.filter)).concat([]).sort((a, b) => {
            if (orderBy === 0)
                return a;
            
            if (orderBy === 1)
                return parseFloat(a.risk) - parseFloat(b.risk);
        });

        if (order === "desc") 
            risks.reverse();

        const setPage = page => {
            this.setState({
                page
            });
        };

        const setRowsPerPage = rows => {
            this.setState({
                rowsPerPage: rows
            });
        };

        return (
            <Paper>
                <Container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField
                        label="Search a country"
                        onChange={event => {
                            this.setState({
                                filter: event.target.value
                            })
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                </Container>

                <div>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        sortDirection={orderBy === column.id ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={() => {
                                                this.setState({
                                                    orderBy: column.id,
                                                    order: column.id !== orderBy ? "asc" : order === "asc" ? "desc" : "asc"
                                                });
                                            }}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {risks.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map(risk => (
                                <TableRow key={risk.id}>
                                    <TableCell>{risk.country}</TableCell>
                                    <TableCell>{risk.risk >= 0 ? parseFloat(parseFloat(risk.risk).toFixed(7)*10).toFixed(3) : "No data"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={risks.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={(event, page) => {
                        setPage(page);
                    }}
                    onChangeRowsPerPage={(event, rows) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </Paper>
        );
    }
}


export default MainTable;