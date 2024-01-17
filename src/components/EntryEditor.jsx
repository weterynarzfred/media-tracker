import { useDispatch, useTrackedState } from './StateProvider';
import { ACTION_TYPES } from '../clientSide/mainReducer';
import createEntry from '../clientSide/createEntry';

// TODO: this was just a quick test, should probably switch to sending FormData
function ab2str(arrayBuffer) {
  return String.fromCharCode(...new Uint8Array(arrayBuffer));
}

export default function EntryEditor() {
  const state = useTrackedState();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;

    let fileReader = new FileReader();
    const entry = {
      id: editedEntry?.id,
      type: formElement.querySelector('[name=type]').value,
      name: formElement.querySelector('[name=name]').value,
    };

    const coverInput = formElement.querySelector('[name=cover]');
    if (coverInput.files.length > 0) {
      fileReader.readAsArrayBuffer(coverInput.files[0]);

      await new Promise((resolve, reject) => {
        fileReader.onload = () => {
          entry.coverData = ab2str(fileReader.result);
          entry.coverExtension = coverInput.files[0].name.split('.').pop();
          resolve();
        };
        fileReader.onerror = reject;
      });
    }

    createEntry({
      entry,
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
