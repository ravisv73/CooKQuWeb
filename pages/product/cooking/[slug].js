import { useRouter } from 'next/router'
import React from 'react'
import data from '../../../utils/data';
import Layout from '../../../components/Layout';
import NextLink from 'next/link'
import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import useStyles from '../../../utils/styles';
import Image from 'next/image';
import Product from '../../../models/product';
import MasalaRecipe from '../../../models/masalarecipe';
import db from '../../../utils/db';


export default function CookingScreen(props) {
    const router = useRouter();
    const {product, masalarecipe} = props;
    const classes = useStyles();
    //const {slug} = router.query;
    //const product = data.products.find((a) => a.slug === slug);
    if (!product){
        return <div>Cooking instructions Not Found</div>
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
                <Grid item md={6} xs={12}>
                    
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
                                    YouTube Video
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={12} xs={24}>
                    <List>
                        <ListItem>
                            <Typography component="h3" variant="h3">{masalarecipe.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category: {masalarecipe.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Description: {masalarecipe.description}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component="h1" variant="h1">Ingredients</Typography>
                        </ListItem>
                        <ListItem>
                            <Grid>
                                {masalarecipe.ingredients.map((ingredient) => (
                                <Grid item md={12} key={ingredient.name}>
                                    <List>
                                        <ListItem>
                                            <Typography component="h1" variant="h1">{ingredient.name}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography>Amount: {ingredient.amount} {ingredient.unit}</Typography>
                                        </ListItem>
                                    </List>
                                </Grid>
                                ))}
                            </Grid>
                        </ListItem>
                    </List>
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
    console.log("Slug: ", slug);
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    const masalaRecipeSlug = product.masalaRecipeSlug;
    const masalarecipe = await MasalaRecipe.findOne({ masalaRecipeSlug}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    await db.disconnect();
    return {
      props: {
        product: db.convertProductDocToObj(product),
        masalarecipe: db.convertMasalaRecipeDocToObj(masalarecipe),
      },
    };
  }