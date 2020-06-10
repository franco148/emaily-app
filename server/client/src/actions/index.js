import axios from 'axios';
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  // const request = axios.get('/api/current_user');

  // return {
  //   type: FETCH_USER,
  //   payload: request
  // };

  return function(dispatch) {
    axios.get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  }
};
