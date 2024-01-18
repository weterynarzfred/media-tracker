/* eslint-disable @next/next/no-img-element */

import deleteEntry from '@/clientSide/deleteEntry';
import { ACTION_TYPES } from '@/clientSide/mainReducer';
import { useDispatch } from '@/components/StateProvider';

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
    <div className="EntryItem__cover-wrap">
      {
        entry.cover !== undefined ?
          < img className="EntryItem__cover" src={`/media/${entry.cover}`} alt={entry.name + ' cover'} /> :
          null
      }
    </div>
    <div className="EntryItem__id">{entry.id}</div>
    <div className="EntryItem__type">{entry.type}</div>
    <div className="EntryItem__name">{entry.name}</div>
    <div className="EntryItem__seen">{entry.countSeen} / {entry.countOut}</div>
    <button className="EntryItem__delete" onClick={handleDelete}>&times;</button>
    <button className="EntryItem__edit" onClick={handleEdit}>edit</button>
  </div>;
}
