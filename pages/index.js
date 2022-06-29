import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Grid, Typography, Button, List, ListItem  } from '@material-ui/core'
import data from '../utils/data';
import { ReceiptRounded } from '@mui/icons-material'

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Recipes</h1>
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid item md={4} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardContent><Typography>{product.name}</Typography></CardContent>
                          <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>Rs.{product.price}/-</Typography>
                    <Button size="small" color="primary">Add to cart</Button>
                  </CardActions>
                </Card> 
              </Grid>
            ))}
          </Grid>
      </div>
    </Layout>    
  )
}
