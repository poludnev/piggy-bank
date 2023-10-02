import { DB_SUB_CATEGORIES_COLLECTION_NAME } from '@/libs/constants';
import { IDBInsertResult } from '@/types/api';
import { ISubCategory, TNewSubCategory } from '@/types/transactions';
import { insertOneByCollectionName, requestByCollectionName } from '@/utils/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
export default async function susbCategoryHandler(
  req: NextApiRequest,
  res: NextApiResponse<ISubCategory[] | IDBInsertResult | Error>,
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
      const requestData: TNewSubCategory = req.body;
      const insertResult = await insertOneByCollectionName(
        DB_SUB_CATEGORIES_COLLECTION_NAME,
        requestData,
      );
      if (!insertResult) throw new Error('failed to add subcategory');
      res.status(201).json({
        message: `Added with id: ${insertResult?.insertedId}`,
        insertedId: insertResult?.insertedId,
      });
      return;
    }
    if (req.method === 'GET') {
      const subCategories: ISubCategory[] = await requestByCollectionName<ISubCategory>(
        DB_SUB_CATEGORIES_COLLECTION_NAME,
      );
      res.status(200).json(subCategories);
      return;
    }
    res.status(422).json(new Error('unknown request'));
  } catch (error) {
    console.error('susbCategoryHandler error', error);
    const responseError = new Error('internal server error');
    res.status(500).json(responseError);
  }
}
