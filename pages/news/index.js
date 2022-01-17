import en from "@/locales/en";
import jp from "@/locales/jp";
import cn from "@/locales/cn";

import { API_URL } from "@/config/index";

import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout.js";
import styles from "@/styles/Home.module.css";

export default function news({ content }) {
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

  return (
    <Layout>
      <main className={styles.main}>
        <h1>{t.newsList}</h1>

        {content.map((item, i) => {
          return (
            <Link key={i} href={`/news/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          );
        })}

      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const initialRes = await fetch(`${API_URL}/pages`);
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
        translationRes = await fetch(`${API_URL}/pages/${item}`);
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
