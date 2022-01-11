import en from "../locales/en";
import jp from "../locales/jp";
import cn from "../locales/cn";

import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ content }) {
  const { showBanner, setBanner } = useState(true);

  const router = useRouter();
  const { locale } = router;

  let t;

  if (locale === "en-US") {
    t = en;
  } else if (locale === "zh-CN") {
    t = cn;
  } else {
    t = jp;
  }

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push("/", "/", { locale });
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{t.hero}</h1>

        <select onChange={changeLanguage} defaultValue={locale}>
          <option value="en-US">English</option>
          <option value="ja-JP">日本語</option>
          <option value="zh-CN">Chinese</option>
        </select>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        {content.map((item, i) => {
          return (
            <Link key={i} href={`/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          );
        })}

        <div className={styles.grid}>
          <Link href="/about">
            <a>About Page</a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const initialRes = await fetch(`http://localhost:1337/pages`);
  const initial = await initialRes.json();

  // initial -> get localizasions.id for each language
  // run loop function and get each article title
  // return 
  // ref) Promise.all and　Array.map - async/await https://suzukalight.com/snippet/posts/2020-12-30-map-async

  let translation = [];
  let translationRes = [];

  if (locale !== "ja-JP") {

    let localeNum = +0;
    if (locale === "en-US") {
      localeNum = +0;
    } else if (locale === "zh-CN") {
      localeNum = 1;
    }

    const translationId = initial.map((item, i) => {
      return item.localizations[localeNum].id;
    });

    await Promise.all(
      translationId.map(async (item, i) => {
        translationRes = await fetch(`http://localhost:1337/pages/${item}`);
        const translationData = await translationRes.json();
        translation.push(translationData);
        return translation;
      })
    );
  }

  return {
    props: {
      content: translation.length > 0 ? translation : initial,
    },
  };
};
