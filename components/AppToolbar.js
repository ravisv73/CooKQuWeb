import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Toolbar, Typography, Container, Grid, Link, CssBaseline, createTheme, MuiThemeProvider, Switch, Badge } from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function AppToolbar({title, description, children}) {

    const {state, dispatch} = useContext(Store);
    const {darkMode, cart} = state;
    var numItemsCart = 0;
    if (cart.cartItems.length > 0) {
        numItemsCart = cart.cartItems.length;
    }
    // The element for darkmode
    // <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
    const classes = useStyles();  
 
    const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    
    if (!hasMounted) {
      return null;
    }

    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookies.set('darkMode',newDarkMode ? 'ON' : 'OFF');
    }
    return (
    <div>
        <Toolbar>
            <NextLink href="/" passHref>
                <Link>
                    <Typography className={classes.brand}>Cook Quick and Easy</Typography>
                </Link>
            </NextLink>
            <div className={classes.grow}></div>
                <NextLink href="/order/cart" passHref>
                    <Link>
                    <Typography component="h2" variant="h2">{numItemsCart > 0 ? <Badge color = "secondary" badgeContent={numItemsCart}> Cart </Badge>  : 'Cart '}</Typography>
                    </Link>
                </NextLink>
                <NextLink href="/login" passHref>
                    <Link><Typography component="h2" variant="h2">Login</Typography></Link>
                </NextLink>
        </Toolbar>
    </div>
  )
}
