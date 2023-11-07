import { IAPIPostResponce } from '@/types/api';
import { ITransaction, WithoutId } from '@/types/transactions';
import { IUser } from '@/types/users';
import { MongoClient, MongoServerError } from 'mongodb';

export const getMongoDBUri = (): string => {
  const username = encodeURIComponent(process.env.DB_USER_NAME as string);
  const password = encodeURIComponent(process.env.DB_USER_PASSWORD as string);
  const cluster = process.env.DB_CLUSTER;

  console.log('db username', username);
  console.log('db password', password);
  console.log('db cluster', cluster);

  return `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
};

export const getDBClient = (): MongoClient => {
  console.time();
  const uri = getMongoDBUri();
  console.log('get DB clietn', uri);

  const database = process.env.DB_DATABASE_NAME;
  console.log('getDBClient, db database', database);
  console.log('mongoDb uri', uri);
  const mongoClient = new MongoClient(uri);
  // console.log('new client', mongoClient);
  return mongoClient;
};

export const requestUserByEmail = async (email: string): Promise<IUser | null> => {
  const client = getDBClient();
  try {
    const database = process.env.DB_DATABASE_NAME;
    const db = client.db(database);
    const collection = db.collection<IUser>('users');
    const user = await collection.findOne({ email });
    if (!user) throw new Error('requestUserByEmail error: unknown user');
    return { ...user, id: user?._id.toString() };
  } catch (error) {
    console.error('requestUserByEmail error', error);
    return null;
  } finally {
    client.close();
  }
};

export const requestByCollectionName = async <T extends { id: string }>(
  collectionName: string,
): Promise<T[]> => {
  const client = getDBClient();
  try {
    const database = process.env.DB_DATABASE_NAME;
    const db = client.db(database);
    const collection = db.collection<T>(collectionName);
    const results = await collection.find().toArray();
    return results.map((result) => ({ ...result, id: result._id.toString() })) as T[];
  } catch (error) {
    console.error('requestByCollectionName error: ', error);
    return [];
  } finally {
    client.close();
  }
};

export const requestTransactionsByDateInterval = async (from: Date, to: Date) => {
  const client = getDBClient();

  const database = process.env.DB_DATABASE_NAME;
  const db = client.db(database);
  const collection = db.collection<ITransaction>('transactions');

  //TODO: fix up types https://github.com/poludnev/piggy-bank/issues/6
  //@ts-ignore
  const results = await collection
    .find({ date: { $gt: from.toISOString(), $lt: to.toISOString() } })
    .toArray();

  return results.map((result) => ({ ...result, id: result._id.toString() }));
};

export const insertOneByCollectionName = async <T extends WithoutId<T>>(
  collectionName: string,
  requestData: T,
): Promise<IAPIPostResponce | null> => {
  const client = getDBClient();
  try {
    const database = process.env.DB_DATABASE_NAME;
    const db = client.db(database);
    const collection = db.collection(collectionName);
    const insertResult = await collection.insertOne(requestData);
    return { ...insertResult, insertedId: insertResult.insertedId.toString() };
  } catch (error) {
    console.error('insertOneByCollectionName error', error);
    return null;
  } finally {
    client.close();
  }
};
