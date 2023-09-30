// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDBClient } from '@/utils/mongo';
import { MongoServerError } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('run handler 0')
    const client = getDBClient();
    console.log('run handler 1')
    await client.connect();
    console.log('run handler 2')

    const database = process.env.DB_DATABASE_NAME;
    console.log('db database', database);
    const db = client.db(database);
    const collection = db.collection('test-collection');
    const results = await collection.find().toArray();
    console.log('hello heandler resulst', results);

    res.status(200).json(results);
    client.close();
  } catch (error) {
    console.log('hello heandler error', error);
    res.status(500).send('server interal error');
  }
}
