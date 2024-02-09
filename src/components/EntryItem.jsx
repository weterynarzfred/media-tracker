/* eslint-disable @next/next/no-img-element */

import { ACTION_TYPES } from '@/clientSide/mainReducer';
import { useDispatch } from '@/components/StateProvider';

export default function EntryItem({ entry }) {
  const dispatch = useDispatch();

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
        entry.cover !== null ?
          < img className="EntryItem__cover" src={`/media/${entry.cover}`} alt={entry.name + ' cover'} /> :
          null
      }
      <button className="EntryItem__edit" onClick={handleEdit}>edit</button>
    </div>

    <div className="EntryItem__name-wrap">
      <div className="EntryItem__type">{entry.type}</div>
      <div className="EntryItem__name">{entry.name}</div>
    </div>
    <div className="EntryItem__seen">
      {
        entry.countSeen || entry.countOut ?
          (entry.countSeen ? entry.countSeen : 0) +
          (entry.countOut ? ` / ${entry.countOut}` : '') :
          null
      }
    </div>
  </div>;
}
