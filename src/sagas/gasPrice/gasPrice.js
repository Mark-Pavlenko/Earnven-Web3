import { put, call, delay } from 'redux-saga/effects';
import * as API from '../../components/LoansAndSavings/api/api';
import { data } from '../../globalStore';
import { setGasData } from './actions';
import FastGweiGasIcon from '../../assets/icons/fastGweiGasIcon.png';
import MiddleGweiGasIcon from '../../assets/icons/middleGweiGasIcon.png';
import SlowGweiGasIcon from '../../assets/icons/slowGweiGasIcon.png';

export function* getGasPriceWatcher() {
  yield call(getGasPriceWorker);
}

function* getGasPriceWorker() {
  while (true) {
    const gasType = [
      {
        value: '',
        label: 'Fast',
        icon: FastGweiGasIcon,
      },
      {
        value: '',
        label: 'Average',
        icon: MiddleGweiGasIcon,
      },
      {
        value: '',
        label: 'Slow',
        icon: SlowGweiGasIcon,
      },
    ];
    const gasPriceData = yield call(API.getGasPriceData);
    const { result } = gasPriceData.data;
    gasType[0].value = result.FastGasPrice;
    gasType[1].value = result.ProposeGasPrice;
    gasType[2].value = result.SafeGasPrice;
    data.gasSelected = result.ProposeGasPrice;
    yield delay(10000);
    yield put(setGasData([...gasType]));
  }
}
