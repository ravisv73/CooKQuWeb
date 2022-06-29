// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../utils/db";


export default async function handler(req, res) {
  console.log("In handler");
  db.connect();
  db.disconnect();
  res.status(200).json({name: 'Vijayalakshmi & Varadarajan'});
  //res.status(200).json({ name: 'John Doe' })
}

