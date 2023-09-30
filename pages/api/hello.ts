// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDBClient } from '@/utils/mongo';
import { MongoClient, MongoServerError, ServerApiVersion } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const uri =
  'mongodb+srv://poludnev:fUW53XGwfs5I1CUh@cluster0.ehyj6xn.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('run handler 0');
    // const client = getDBClient();
    // console.log('run handler 1');
    await client.connect();
    // console.log('run handler 2');

    const database = process.env.DB_DATABASE_NAME;
    // console.log('db database', database);
    const db = client.db(database);
    const collection = db.collection('test-collection');
    const results = await collection.find().toArray();
    // console.log('hello heandler resulst', results);
    run().catch(console.dir);

    res.status(200).json(results);
    client.close();
  } catch (error) {
    console.log('hello heandler error', error);
    res.status(500).json(error);
  }
}
