import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Toolbar, Typography, Container, Link, CssBaseline, createTheme, MuiThemeProvider, Switch, Badge } from '@material-ui/core';
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
                <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                <NextLink href="/cart" passHref>
                    <Link>
                        {numItemsCart > 0 ? <Badge color = "secondary" badgeContent={numItemsCart}> Cart</Badge>  : 'Cart'}
                    </Link>
                </NextLink>
                <NextLink href="/login" passHref>
                    <Link>Login</Link>
                </NextLink>
        </Toolbar>
    </div>
  )
}
