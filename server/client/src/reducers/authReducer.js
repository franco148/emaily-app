export default function(state = {}, action) {
  console.log('Loggin Action: ', action);
  switch (action.type) {
    default:
      return state;
  }
}
