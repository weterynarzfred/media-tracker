import { useDispatch, useTrackedState } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';
import createEntry from '../clientSide/createEntry';

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    createEntry({
      form: formData,
      isNew: editedEntry === undefined,
      callback: data => {
        dispatch({
          type: ACTION_TYPES.ENTRY_EDIT,
          entry: data.entry,
        });
        dispatch({
          type: ACTION_TYPES.ENTRY_EDITOR,
          isOpen: false,
        });
      },
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
        <label>
          <input type="file" name="cover" />
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
