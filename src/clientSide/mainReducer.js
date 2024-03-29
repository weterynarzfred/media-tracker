const ACTION_TYPES = {
  INIT: 'INIT',
  ENTRY_EDIT: 'ENTRY_EDIT',
  ENTRY_DELETE: 'ENTRY_DELETE',
  ENTRY_EDITOR: 'ENTRY_EDITOR',
};

export default function mainReducer(state, action) {

  if (action.type === ACTION_TYPES.INIT) {
    Object.assign(state, action.data);
    state.isLoaded = true;

  } else if (action.type === ACTION_TYPES.TEST) {
    state.test = state?.test === undefined ? 1 : state.test + 1;

  } else if (action.type === ACTION_TYPES.ENTRY_EDIT) {
    if (action.entry === undefined) return;
    state.entries[action.entry.id] = action.entry;
    if (!state.types.includes(action.entry.type)) state.types.push(action.entry.type);
    if (!state.statuses.includes(action.entry.status)) state.statuses.push(action.entry.status);
    if (!state.languages.includes(action.entry.language)) state.languages.push(action.entry.language);

  } else if (action.type === ACTION_TYPES.ENTRY_DELETE) {
    delete state.entries[action.id];

  } else if (action.type === ACTION_TYPES.ENTRY_EDITOR) {
    if (state.entryEditor === undefined) state.entryEditor = {};
    if (action.isOpen !== undefined) state.entryEditor.isOpen = action.isOpen;
    if (action.isAskedToDelete !== undefined) state.entryEditor.isAskedToDelete = action.isAskedToDelete;
    if (action.id !== undefined) state.entryEditor.id = action.id;

    else if (action.isOpen === false) {
      state.entryEditor.id = -1;
      state.entryEditor.isAskedToDelete = false;
    }
  }
}

export {
  ACTION_TYPES,
};
