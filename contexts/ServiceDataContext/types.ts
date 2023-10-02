import { IServiceDateStateReducerState } from './reducers';

export interface IServiceDataContextState extends IServiceDateStateReducerState {
  testdata: string;
  doSm: () => void;
}
