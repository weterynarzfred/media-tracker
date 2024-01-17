const ACTION_TYPES = {
  INIT: 'INIT',
  TEST: 'TEST',
  ENTRY_EDIT: 'ENTRY_EDIT',
  ENTRY_DELETE: 'ENTRY_DELETE',
  ENTRY_EDITOR: 'ENTRY_EDITOR',
};

export default function mainReducer(state, action) {
  if (action.type === ACTION_TYPES.INIT) {
    state.entries = action.entries;
    state.isLoaded = true;
  } else if (action.type === ACTION_TYPES.TEST) {
    state.test = state?.test === undefined ? 1 : state.test + 1;
  } else if (action.type === ACTION_TYPES.ENTRY_EDIT) {
    if (action.entry !== undefined)
      state.entries[action.entry.id] = action.entry;
  } else if (action.type === ACTION_TYPES.ENTRY_DELETE) {
    delete state.entries[action.id];
  } else if (action.type === ACTION_TYPES.ENTRY_EDITOR) {
    if (state.entryEditor === undefined) state.entryEditor = {};
    if (action.isOpen !== undefined) state.entryEditor.isOpen = action.isOpen;
    if (action.id !== undefined) state.entryEditor.id = action.id;
  }
}

export {
  ACTION_TYPES,
};
