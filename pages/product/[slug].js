import { useRouter } from 'next/router'
import React from 'react'
import data from '../../utils/data';
import Layout from '../../components/Layout';
import NextLink from 'next/link'
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/product';
import db from '../../utils/db';


export default function ProductScreen(props) {
    const router = useRouter();
    const {product} = props;
    const classes = useStyles();
    //const {slug} = router.query;
    //const product = data.products.find((a) => a.slug === slug);
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
                            <NextLink href={`/product/packing/${product.slug}?servings=2`} passHref>
                                <Link><Typography component="h2" variant="h2">Packing Instructions</Typography></Link>
                            </NextLink>
                        </ListItem>
                        <ListItem>
                            <NextLink href={`/product/cooking/${product.slug}?servings=2`} passHref>
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
                                <Button fullWidth variant="contained" color="primary">
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
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
      props: {
        product: db.convertProductDocToObj(product),
      },
    };
  }