import deleteEntry from '../clientSide/deleteEntry';
import { ACTION_TYPES } from '../clientSide/mainReducer';
import { useDispatch } from './StateProvider';

export default function EntryItem({ entry }) {
  const dispatch = useDispatch();

  function handleDelete() {
    deleteEntry({
      entry,
      callback: () => dispatch({
        type: ACTION_TYPES.ENTRY_DELETE,
        id: entry.id,
      }),
    });
  }

  function handleEdit() {
    dispatch({
      type: ACTION_TYPES.ENTRY_EDITOR,
      isOpen: true,
      id: entry.id,
    });
  }

  return <div className="EntryItem">
    {entry.id} [{entry.type}]: {entry.name}
    <button className="EntryItem__delete" onClick={handleDelete}>x</button>
    <button className="EntryItem__edit" onClick={handleEdit}>e</button>
  </div>;
}
