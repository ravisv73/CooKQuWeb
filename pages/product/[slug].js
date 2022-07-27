//import { useRouter } from 'next/router'
import React, { useContext }  from 'react'
//import data from '../../utils/data';
import Layout from '../../components/Layout';
import NextLink from 'next/link'
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/product';
import db from '../../utils/db';
import {Store} from '../../utils/Store';
import axios from 'axios';
import {useRouter} from 'next/router';

export default function ProductScreen(props) {
    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const [servings, setServings] = React.useState(2);
    //const router = useRouter();
    const {product} = props;
    const classes = useStyles();
    //const {slug} = router.query;
    //const product = data.products.find((a) => a.slug === slug);

    const addToCartHandler = async () => {
        const existItem = state.cart.cartItems.find(x=>x._id === product._id);
        const quantity = existItem ? existItem.quantity+1: 1;
        const {data} = await axios.get(`/api/products/${product._id}`);
        if(data.countInStock < quantity ) {
            window.alert('Sorry, Product is out of stock');
            return;
        }
        dispatch ({type: 'CART_ADD_ITEM', payload: {...product, quantity } });
        router.push('/order/cart');
    }

    function incrementServings() {
        setServings(servings + 1);
      }

      function decrementServings() {
        if (servings == 2) {
            setServings(2);
            return;
        }
        setServings(servings - 1);
    }

    if (!product){
        return <div>Product Not Found</div>
    }
    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href="/" passHref>
                    <Link><Typography>Back to Products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={4} xs={8}>
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        width={50} 
                        height={50} 
                        layout="responsive">
                    </Image>
                </Grid>
                <Grid item md={3} xs={6}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1">{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category: {product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Cuisine: {product.cuisine}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Description: {product.description}</Typography>
                        </ListItem>
                        <ListItem>
                            <NextLink href={`/product/packing/${product.slug}?servings=${servings}`} passHref>
                                <Link><Typography component="h2" variant="h2">Packing Instructions</Typography></Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            <NextLink href={`/product/cooking/${product.slug}?servings=${servings}`} passHref>
                                <Link><Typography component="h2" variant="h2">Cooking Instructions</Typography></Link>
                            </NextLink>
                        </ListItem>


                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                        <Grid item xs={6}><Typography >Servings: {servings}  </Typography></Grid>
                                        <Grid item xs={6}>
                                            <div>
                                                <Button  onClick={incrementServings} variant="contained" color="primary">
                                                    <Typography> + </Typography>
                                                </Button>
                                                <Button  onClick={decrementServings} variant="contained" color="primary">
                                                    <Typography> - </Typography>
                                                </Button>
                                            </div>
                                        </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem><Typography>Minimum Servings to order is 2 </Typography></ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Price</Typography></Grid>
                                    <Grid item xs={6}><Typography>Rs.{product.price}/-</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Status</Typography></Grid>
                                    <Grid item xs={6}><Typography>{product.status}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                                    Add to cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            <div>
        </div>
  
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const product = await Product.findOne({ slug }, {_id: 1, createdAt: 0, updatedAt: 0, __v: 0 }).lean();
    await db.disconnect();
    return {
      props: {
        product: db.convertProductDocToObj(product),
      },
    };
  }