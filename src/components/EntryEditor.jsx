import { useDispatch, useTrackedState } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const entry = {
      id: editedEntry?.id,
      type: formElement.querySelector('[name=type]').value,
      name: formElement.querySelector('[name=name]').value,
    };

    fetch('/api/entries', {
      method: editedEntry === undefined ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entry }),
    }).then(response => {
      if (response.ok) return response.json();
      else throw new Error('network error');
    }).then(data => {
      dispatch({
        type: ACTION_TYPES.ENTRY_EDIT,
        entry: data.entry,
      });
      dispatch({
        type: ACTION_TYPES.ENTRY_EDITOR,
        isOpen: false,
      });
    });
  }

  const editedEntry = [-1, undefined].includes(state.entryEditor?.id) ? undefined : state.entries[state.entryEditor.id];

  const creatorWindow = <div className="EntryCreator__window">
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input type="text" name="type" placeholder="type" autoComplete="off" defaultValue={editedEntry?.type} />
        </label>
      </div>
      <div>
        <label>
          <input type="text" name="name" placeholder="name" autoComplete="off" defaultValue={editedEntry?.name} />
        </label>
      </div>
      <div>
        <button type="submit">{editedEntry === undefined ? 'add' : 'save'}</button>
      </div>
    </form>
  </div>;

  return <div className="EntryEditor">
    <button onClick={() => {
      dispatch({
        type: ACTION_TYPES.ENTRY_EDITOR,
        isOpen: !state.entryEditor?.isOpen,
        id: -1,
      });
    }}>{state.entryEditor?.isOpen ? 'close editor' : 'add entry'}</button>
    {state.entryEditor?.isOpen ? creatorWindow : null}
  </div>;
}
