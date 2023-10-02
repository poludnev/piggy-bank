export interface IAPIPostResponce {
  insertedId: string;
}

export interface IDBInsertResult extends IAPIPostResponce {
  message: string;
}
