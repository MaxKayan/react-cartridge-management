import { Container, Grid } from "@material-ui/core";
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import { green, blue } from "@material-ui/core/colors";

import "./App.css";
import { NavBar, CartridesTable } from "./components";

import { fetchCartridgesList, fetchSupplies } from "./api";

import React, { Component } from "react";
import SuppliesTable from "./components/SuppliesTable/SuppliesTable";

// import styles from "./App.css";

export class App extends Component {
  state = {
    navbarTitle: "Cartridges",
    theme: responsiveFontSizes(
      createMuiTheme({
        palette: {
          primary: blue,
          secondary: green,
        },
        status: {
          danger: "orange",
        },
      })
    ),
    cartridgesData: [],
    suppliesData: [],
  };

  async componentDidMount() {
    const cartridges = await fetchCartridgesList();
    const supplies = await fetchSupplies();
    this.setState({ cartridgesData: cartridges, suppliesData: supplies });
  }

  render() {
    const { navbarTitle, theme, cartridgesData, suppliesData } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <NavBar title={navbarTitle} />
        <Container style={{ paddingTop: 5 + "%" }} maxWidth="lg">
          <Grid container spacing={3}>
            <Grid key="cartridges" xs={12} lg={4} item>
              <CartridesTable cartridges={cartridgesData} />
            </Grid>
            <Grid key="supplies" xs={12} lg={8} item>
              <SuppliesTable supplies={suppliesData} />
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
