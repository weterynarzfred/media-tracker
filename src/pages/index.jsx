import EntryList from '../components/EntryList';
import StateProvider from '../components/StateProvider';

export default function Home() {
  return (
    <main className="main">
      <StateProvider >
        <EntryList />
      </StateProvider>
    </main>
  );
}
