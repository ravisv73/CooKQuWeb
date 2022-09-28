import { useRouter } from "next/router";
import React from "react";
import data from "../../../utils/data";
import Layout from "../../../components/Layout";
import NextLink from "next/link";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import useStyles from "../../../utils/styles";
import Image from "next/image";
import Product from "../../../models/product";
import Cooking from "../../../models/cooking";
import db from "../../../utils/db";

export default function CookingScreen(props) {
  const router = useRouter();
  const params = router.query;
  const { product, cooking } = props;
  const classes = useStyles();
  //const {slug} = router.query;
  //const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>Cooking instructions Not Found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to Products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={4} xs={6}>
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={6} xs={12}>
          <List>
            <ListItem>
              <Typography component="h4" variant="h4">
                Cooking Video
              </Typography>
            </ListItem>
            <ListItem>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/X5_FFdc8yQg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={12} xs={24}>
          <List>
            <ListItem>
              <Typography component="h3" variant="h3">
                {cooking.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography component="h1" variant="h1">
                Servings: {params.servings}{" "}
              </Typography>
            </ListItem>
            <ListItem>
              <Grid>
                {cooking.groups.map((group) => (
                  <Grid item md={12} key={group.title}>
                    <List>
                      <ListItem>
                        <Typography component="h1" variant="h1">
                          {group.title}{" "}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Grid>
                          {group.steps.map((step) => (
                            <Grid item md={12} key={step.step}>
                              <List>
                                <ListItem>
                                  <div style={{ whiteSpace: "pre-wrap" }}>
                                    <Typography>
                                      {step.step} : {step.instruction}
                                    </Typography>
                                  </div>
                                </ListItem>
                              </List>
                            </Grid>
                          ))}
                        </Grid>
                      </ListItem>
                    </List>
                  </Grid>
                ))}
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <div></div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  console.log("Slug: ", slug);
  await db.connect();
  const product = await Product.findOne(
    { slug },
    { _id: 1, createdAt: 0, updatedAt: 0, __v: 0 }
  ).lean();
  const recipeSlug = product.recipeSlug;
  const cooking = await Cooking.findOne(
    { recipeSlug },
    { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  ).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertProductDocToObj(product),
      cooking: db.convertCookingDocToObj(cooking),
    },
  };
}
