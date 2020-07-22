import Head from 'next/head';
import ChatBox from 'components/ChatBox';
import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>DartBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.pageContent}>
        <div className={styles.chatBox}>
          <ChatBox />
        </div>
      </main>
    </>
  );
}
