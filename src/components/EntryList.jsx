import EntryEditor from '@/components/EntryEditor';
import EntryItem from '@/components/EntryItem';
import { useTrackedState } from '@/components/StateProvider';

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
