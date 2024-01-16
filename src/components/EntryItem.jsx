export default function EntryItem({ entry }) {
  return <div className="EntryItem">
    {entry.id} [{entry.type}]: {entry.name}
  </div>;
}
