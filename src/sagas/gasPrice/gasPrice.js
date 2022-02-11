import { put, call, delay } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import { data } from '../../globalStore';
import { setGasData, setProposeGasPrice } from './actions';

export function* getGasPriceWatcher() {
  yield call(getGasPriceWorker);
}

function* getGasPriceWorker() {
  while (true) {
    const gasType = [
      {
        value: '',
        label: 'Fast',
      },
      {
        value: '',
        label: 'Average',
      },
      {
        value: '',
        label: 'Slow',
      },
    ];
    const gasPriceData = yield call(API.getGasPriceData);
    const { result } = gasPriceData.data;
    console.log('resultSaga', result);
    gasType[0].value = result.FastGasPrice;
    gasType[1].value = result.ProposeGasPrice;
    gasType[2].value = result.SafeGasPrice;
    data.gasSelected = result.ProposeGasPrice;
    yield delay(10000);
    yield put(setGasData([...gasType]));
    yield put(setProposeGasPrice(result.ProposeGasPrice));
  }
}
