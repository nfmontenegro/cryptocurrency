import axios from 'axios';
import { apiBaseURL } from './../utils/Constants';
import * as types from './../utils/ActionTypes';


export default function FetchCoinData() {
  return dispatch => {

    dispatch({ type: types.FETCHING_COIN_DATA })

    return axios.get(`${apiBaseURL}/v1/ticker/?limit=10`)
      .then(res => {
        return dispatch({ type: types.FETCHING_COIN_DATA_SUCCESS, payload: res.data })
      })
      .catch(err => {
        return dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err })
      });
  }
}