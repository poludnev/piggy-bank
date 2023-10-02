import { DB_TRANSACTIONS_COLLECTION_NAME } from '@/libs/constants';
import { IDBInsertResult } from '@/types/api';
import { ITransaction, TNewTransaction } from '@/types/transactions';
import { insertOneByCollectionName, requestByCollectionName } from '@/utils/mongo';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function transactionHandler(
  req: NextApiRequest,
  res: NextApiResponse<ITransaction[] | IDBInsertResult | Error>,
) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  if (!token) {
    const responseError = new Error('forbidden');
    res.status(403).json(responseError);
    return;
  }

  try {
    if (req.method === 'POST') {
      const requestData: TNewTransaction = req.body;
      const insertResult = await insertOneByCollectionName(
        DB_TRANSACTIONS_COLLECTION_NAME,
        requestData,
      );
      if (!insertResult) throw new Error('failed to add category');
      res.status(201).json({
        message: `Added with id: ${insertResult?.insertedId}`,
        insertedId: insertResult?.insertedId,
      });
      return;
    }
    if (req.method === 'GET') {
      const subCategories: ITransaction[] = await requestByCollectionName<ITransaction>(
        DB_TRANSACTIONS_COLLECTION_NAME,
      );
      res.status(200).json(subCategories);
      return;
    }
    res.status(422).json(new Error('unknown request'));
  } catch (error) {
    console.error('transactionHandler', error);
    const responseError = new Error('internal server error');
    res.status(500).json(responseError);
  }
}
