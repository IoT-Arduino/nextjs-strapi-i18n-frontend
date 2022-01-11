import en from "../locales/en";
import jp from "../locales/jp";
import cn from "../locales/cn";
import { useRouter } from "next/router";

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
    <div>
      This is about Page
      <p>{t.description}</p>
    </div>
  );
}
