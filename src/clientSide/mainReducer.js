export default function mainReducer(state, action) {
  // console.log(action.type);
  if (action.type === 'INIT') {
    state.entries = action.entries;
    state.isLoaded = true;
  }
  else if (action.type === 'TEST') {
    state.test = state?.test === undefined ? 1 : state.test + 1;
  }
}
