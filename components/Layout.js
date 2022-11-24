import React, { Suspense, useContext, Spinner } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  createTheme,
  MuiThemeProvider,
  Switch,
  Badge,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import AppToolbar from "./AppToolbar";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;
  console.log("darkMode: ", darkMode);
  console.log("cart: ", cart);
  // This component is loaded dynamically
  //const AppToolbar = React.lazy(() => import('./AppToolbar'));

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body: {
        fontWeight: "bold",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Cook Quick and Easy` : "Cook Quick and Easy"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Suspense fallback={<Spinner />}>
            <div>
              <AppToolbar></AppToolbar>
            </div>
          </Suspense>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Cook Quick and Easy.</Typography>
        </footer>
      </MuiThemeProvider>
    </div>
  );
}
