import StateProvider from '../components/StateProvider';
import Test from '../components/Test';

export default function Home() {
  return (
    <main className="main">
      <StateProvider >
        <h1>aaa</h1>
        <Test />
      </StateProvider>
    </main>
  );
}
