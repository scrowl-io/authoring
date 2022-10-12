/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { PayloadAction, Reducer } from '@reduxjs/toolkit';

export type StateValueArray = Array<any | StateValueObject | StateValueArray>;

export type StateValueObject = {
  [key: string]: any | StateValueObject | StateValueArray;
};

export type StateValue = any | StateValueObject | StateValueArray;

export type StateConfig = {
  name: string;
  initialState: StateValue;
  reducers: {
    [key: string]: (state: any, action: PayloadAction<StateValue>) => void;
  };
};

export type StoreConfig = {
  reducer: {
    [key: string]: Reducer;
  };
};

export type RootState = StateValue;

export type StateSelector = any | ReturnType<typeof useSelector>;

export type Dispatch = any | ReturnType<typeof useDispatch>;

export type StateProcessor = {
  data?: any;
  dispatch?: Dispatch;
  isProcessing?: boolean;
  navigator?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
  };
};
