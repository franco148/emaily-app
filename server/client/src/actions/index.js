import axios from 'axios';
import { FETCH_USER } from "./types";

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
  }

