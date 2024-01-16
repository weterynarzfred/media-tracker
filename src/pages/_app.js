import Head from 'next/head';
import '@/styles/index.scss';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title></title>
    </Head>
    <Component {...pageProps} />
  </>;
}
