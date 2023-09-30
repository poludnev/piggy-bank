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
