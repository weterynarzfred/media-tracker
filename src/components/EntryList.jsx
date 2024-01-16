import EntryEditor from './EntryEditor';
import EntryItem from './EntryItem';
import { useTrackedState } from './StateProvider';

export default function EntryList() {
  const state = useTrackedState();

  let items = null;
  if (state.entries !== undefined)
    items = Object.values(state.entries).map(entry => <EntryItem key={entry.id} entry={entry} />);

  return <div className="EntryList">
    entry list
    {items}
    <EntryEditor />
  </div>;
}
