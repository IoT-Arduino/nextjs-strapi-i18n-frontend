import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

export default function Layout({ title, keywords, description,content, children }) {
    const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="desctiption" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header content={content}/>
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}
