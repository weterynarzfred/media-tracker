import Enum from '../lib/Enum';

const ACTION_TYPES = new Enum([
  'INIT',
  'TEST',
  'ENTRY_CREATE',
  'ENTRY_CREATED',
]);

export default function mainReducer(state, action) {
  if (action.type === ACTION_TYPES.INIT) {
    state.entries = action.entries;
    state.isLoaded = true;
  } else if (action.type === ACTION_TYPES.TEST) {
    state.test = state?.test === undefined ? 1 : state.test + 1;
  } else if (action.type === ACTION_TYPES.ENTRY_CREATE) {
    state.entries[action.entry.id] = action.entry;
  }
}

export {
  ACTION_TYPES,
};
