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
  const uri = getMongoDBUri();
  console.log('mongoDb uri', uri);
  const mongoClient = new MongoClient(uri);
  return mongoClient;
};