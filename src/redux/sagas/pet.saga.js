import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PETS" actions
function* fetchPets() {
  try {
    const response = yield axios.get('/api/pets');
    yield put({ type: 'SET_PETS', payload: response.data });
  } catch (error) {
    console.log('Pet get request failed', error);
  }
}

// Our POST would go here

function* petSaga() {
  yield takeLatest('FETCH_PETS', fetchPets);
  // Post goes here too
}

export default petSaga;
