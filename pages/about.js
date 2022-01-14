import en from "../locales/en";
import jp from "../locales/jp";
import cn from "../locales/cn";
import { useRouter } from "next/router";

import Layout from "@/components/Layout.js";

export default function About() {
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
    <Layout title={t.about}>
      <h3>{t.about}</h3>
      <p>{t.description}</p>
    </Layout>
  );
}
