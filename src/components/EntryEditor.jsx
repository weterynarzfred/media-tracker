import { useEffect } from 'react';

import { useDispatch, useTrackedState } from '@/components/StateProvider';
import {
  handleButtonClose,
  handleButtonDelete,
  handleButtonDeleteCancel,
  handleButtonDeleteConfirm,
  handleButtonOpen,
  handleKeyUp,
  handleSubmit,
  handleWrapClick,
} from '@/clientSide/entryEditorHandlers';
import EntryEditorInputs from "@/components/EntryEditorInputs";

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  const editedEntry = [-1, undefined].includes(state.entryEditor?.id) ?
    undefined :
    state.entries[state.entryEditor.id];

  useEffect(() => {
    if (!state.entryEditor?.isOpen) return;

    const boundHandleKeyUp = handleKeyUp.bind(null, dispatch);
    window.addEventListener('keyup', boundHandleKeyUp);
    return () => window.removeEventListener('keyup', boundHandleKeyUp);
  }, [dispatch, state.entryEditor?.isOpen]);

  const editorWindow = <div className="EntryEditor__window">
    <div id="nav-wrap" onClick={handleWrapClick.bind(null, dispatch)}>
      <form
        onSubmit={handleSubmit.bind(null, dispatch, editedEntry)}
        onClick={event => event.isFromEntryEditorForm = true}
      >
        <input type="hidden" name="id" value={editedEntry?.id ?? -1} />
        <input type="hidden" name="cover" value={editedEntry?.cover?.split('?')[0] ?? ''} />
        <EntryEditorInputs
          editedEntry={editedEntry}
          types={state.types}
        />
        <div className="input-row">
          {editedEntry !== undefined ?
            <button
              className="EntryEditor__delete"
              onClick={handleButtonDelete.bind(null, dispatch)}
            >delete</button> : null}
          <button type="submit">{editedEntry === undefined ? 'add' : 'save'}</button>
          <button
            className="EntryEditor__cancel"
            onClick={handleButtonClose.bind(null, dispatch)}
          >cancel</button>
        </div>
        {state.entryEditor?.isAskedToDelete ?
          <div className="EntryEditor__asked-to-delete">
            are you sure you want to delete this entry?
            <div className="EntryEditor__asked-to-delete-choices">
              <div
                className="EntryEditor__asked-to-delete-confirm"
                onClick={handleButtonDeleteConfirm.bind(null, dispatch, editedEntry)}
              >yes</div>
              <div>/</div>
              <div
                className="EntryEditor__asked-to-delete-cancel"
                onClick={handleButtonDeleteCancel.bind(null, dispatch)}
              >no</div>
            </div>
          </div> :
          null}
      </form>
    </div>
  </div>;

  return <div className="EntryEditor">
    <button
      onClick={handleButtonOpen.bind(null, dispatch, state.entryEditor?.isOpen)}>
      add new entry
    </button>
    {state.entryEditor?.isOpen ? editorWindow : null}
  </div>;
}
