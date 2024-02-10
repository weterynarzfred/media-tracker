/* eslint-disable @next/next/no-img-element */

import { ACTION_TYPES } from '@/clientSide/mainReducer';
import EntryItemSeen from "@/components/EntryItemSeen";
import { useDispatch } from '@/components/StateProvider';
import { isEmpty } from "lodash";

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
      <button className="EntryItem__edit button" onClick={handleEdit}>edit</button>
      <div className="EntryItem__type">{entry.type ?? '—'}</div>
    </div>

    <div className="EntryItem__name-wrap">
      <div className="EntryItem__name">{entry.name}</div>
    </div>
    <EntryItemSeen entry={entry} />
  </div>;
}
