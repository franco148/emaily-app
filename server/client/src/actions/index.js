import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// FIRST VERSION: Taking into account promises.
// export const fetchUser = () => {
//   // const request = axios.get('/api/current_user');

//   // return {
//   //   type: FETCH_USER,
//   //   payload: request
//   // };

//   return function(dispatch) {
//     axios.get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   }
// };

// SECOND VERSION: Async & Await
export const fetchUser = () =>
  async dispatch => {
    const currentUserRes = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: currentUserRes.data });
  };

export const handleToken = (token) => async dispatch => {
  const rest = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: rest.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data })
};
