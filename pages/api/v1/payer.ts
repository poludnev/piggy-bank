import { DB_PAYERS_COLLECTION_NAME } from '@/libs/constants';
import { IDBInsertResult } from '@/types/api';
import { IPayer, TNewPayer } from '@/types/transactions';
import { insertOneByCollectionName, requestByCollectionName } from '@/utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
export default async function payerHandler(
  req: NextApiRequest,
  res: NextApiResponse<IPayer[] | IDBInsertResult | Error>,
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
      const requestData: TNewPayer = req.body;
      const insertResult = await insertOneByCollectionName(DB_PAYERS_COLLECTION_NAME, requestData);
      if (!insertResult) throw new Error('failed to add payer');
      res.status(201).json({
        message: `Added with id: ${insertResult?.insertedId}`,
        insertedId: insertResult?.insertedId,
      });
      return;
    }

    if (req.method === 'GET') {
      const payers: IPayer[] = await requestByCollectionName<IPayer>(DB_PAYERS_COLLECTION_NAME);
      res.status(200).json(payers);
      return;
    }
    res.status(422).json(new Error('unknown request'));
  } catch (error) {
    console.error('payerHandler error', error);
    const responseError = new Error('internal server error');
    res.status(500).json(responseError);
  }
}
