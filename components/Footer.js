import en from "../locales/en";
import jp from "../locales/jp";
import cn from "../locales/cn";

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Footer.module.css";

export default function Footer({ content }) {
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
    <footer className={styles.footer}>
      <p>Copytight &copy; Next&Strapi i18n Web Site</p>
      <p>
        <Link href="/about">{t.about}</Link>
      </p>
    </footer>
  );
}
