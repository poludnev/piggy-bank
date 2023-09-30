import { getDBClient } from '@/utils/mongo';
import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (!token) {
    res.status(403).send('forbidden');
    return;
  }
  const client = getDBClient();
  try {
    await client.connect();
    const database = process.env.DB_DATABASE_NAME;
    console.log('db database', database);
    const db = client.db(database);
    const collection = db.collection('test-collection');
    const results = await collection.find().toArray();
    console.log('hello heandler resulst', results);

    res.status(200).json(results);
  } catch (error) {
    console.log('hello heandler error', error);
    res.status(500).json(error);
  } finally {
    client.close();
  }
}
