import EntryItem from './EntryItem';
import { useTrackedState } from './StateProvider';

export default function EntryList() {
  const state = useTrackedState();

  const items = state.entries?.map(entry => <EntryItem key={entry.id} entry={entry} />);

  return <div className="EntryList">
    entry list
    {items}
  </div>;
}
