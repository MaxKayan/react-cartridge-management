import { Container, Grid } from "@material-ui/core";
import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes,
} from "@material-ui/core/styles";

import { SnackbarProvider, useSnackbar } from "notistack";

import { green, blue, lightGreen } from "@material-ui/core/colors";

import "./App.css";

import {
    fetchCartridgesList,
    fetchSupplies,
    fetchOrders,
    deleteSupply,
} from "./api";

import React, { Component } from "react";

import {
    NavBar,
    CartridesTable,
    SuppliesTable,
    SuppliesEditable,
} from "./components";

// import styles from "./App.css";

export class App extends Component {
    state = {
        navbarTitle: "Cartridges",
        theme: responsiveFontSizes(
            createMuiTheme({
                palette: {
                    // type: "dark",
                    primary: blue,
                    secondary: green,
                },
                // status: {
                //   danger: "orange",
                // },
            })
        ),
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
    };

    handleRefresh = async () => {
        const cartridges = await fetchCartridgesList();
        const supplies = await fetchSupplies();
        const orders = await fetchOrders();
        this.setState({
            cartridgesData: cartridges,
            suppliesData: supplies,
            ordersData: orders,
        });
    };

    async handleSupplyDelete(id) {
        await deleteSupply(id);
        await this.handleRefresh();
    }

    async componentDidMount() {
        await this.handleRefresh();
    }

    render() {
        const {
            navbarTitle,
            theme,
            cartridgesData,
            suppliesData,
            ordersData,
        } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <SnackbarProvider>
                    <NavBar title={navbarTitle} />
                    <Container style={{ paddingTop: 5 + "%" }} maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid key="cartridges" xs={12} lg={4} item>
                                <CartridesTable cartridges={cartridgesData} />
                            </Grid>
                            <Grid key="supplies" xs={12} lg={8} item>
                                {/* <SuppliesTable supplies={suppliesData} /> */}
                                <SuppliesEditable
                                    data={suppliesData}
                                    cartridges={cartridgesData}
                                    handleSupplyDelete={this.handleSupplyDelete}
                                />
                            </Grid>
                            {/* <Grid key="materialTable" item>
              
            </Grid> */}
                        </Grid>
                    </Container>
                </SnackbarProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
