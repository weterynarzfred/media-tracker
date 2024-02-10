import { ACTION_TYPES } from "@/clientSide/mainReducer";
import { useDispatch } from "@/components/StateProvider";
import patchEntry from "@/clientSide/patchEntry";
import { useState } from "react";

export default function EntryItemSeen({ entry }) {
  const dispatch = useDispatch();
  const [seen, setSeen] = useState(entry.counts?.seen ?? '0');
  const [saveTimeoutHandle, setSaveTimeoutHandle] = useState();

  function changeSeen(value) {
    setSeen(value);
    clearTimeout(saveTimeoutHandle);
    setSaveTimeoutHandle(setTimeout(() => {
      patchEntry({
        entry,
        path: 'counts.seen',
        value,
        callback: () => {
          dispatch({
            type: ACTION_TYPES.ENTRY_EDIT,
            entry: {
              ...entry,
              counts: {
                ...entry.counts,
                seen: value,
              },
            },
          });
        },
      });
    }, 1000));
  }

  function handleChange(event) {
    changeSeen(event.currentTarget.value);
  }

  function handleIncrement() {
    const splitValue = seen.split(/([0-9.]+)/)
      .filter(e => e !== '')
      .reverse();
    for (let i = 0; i < splitValue.length; i++) {
      const e = splitValue[i];
      if (isNaN(e)) continue;
      const exp = (Math.round((e - Math.floor(e)) * 1e6) / 1e6).toString().length - 2;
      splitValue[i] = parseFloat(e) + Math.pow(10, -Math.max(exp, 0));
      splitValue[i] = Math.round(splitValue[i] * 1e6) / 1e6;
      break;
    }
    console.log(splitValue);
    const value = splitValue.reverse().join('');
    changeSeen(value);
  }

  return <div className="EntryItemSeen">
    <input type="text" value={seen} onChange={handleChange} />
    <div className="EntryItemSeen__increment button" onClick={handleIncrement}>+</div>
    <div className="EntryItemSeen__out">{entry?.counts?.out ? ` / ${entry.counts.out}` : ''}</div>
  </div>;
}
