import Link from "next/link";
import { useRouter } from "next/router";

function Page({ content }) {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const locale = e.target.value;

    // localizations.locale の値とlocaleの値が同じオブジェクトのIDを取得する
    const targetId = undefined;
    const fileterdData = content.localizations.filter((item) => {
      return item.locale !== "en" ? item.locale === locale : locale === "en-US";
    });
    targetId = fileterdData[0].id;

    if (locale === "en-US") {
      router.push(`/${targetId}`, `/${targetId}`, { locale });
    } else if (locale === "zh-CN") {
      router.push(`/${targetId}`, `/${targetId}`, { locale });
    } else {
      router.push(`/${targetId}`, `/${targetId}`, { locale });
    }
  };

  return (
    <div className="container">
      <h2>{content.title}</h2>

      <div className="body">{content.body}</div>

      <hr />

      <select onChange={changeLanguage} defaultValue={locale}>
        <option value="en-US">English</option>
        <option value="ja-JP">日本語</option>
        <option value="zh-CN">Chinese</option>
      </select>

      <hr />

      <Link href="/">Back to Home</Link>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  let translation = undefined;

  const initialRes = await fetch(`http://localhost:1337/pages/${id}`);
  const initial = await initialRes.json();

  // if (locale === "en-US") {
  //   const translationRes = await fetch(
  //     `http://localhost:1337/pages/${initial.localizations[0].id}`
  //   );
  //   const translation = await translationRes.json();
  // }

  return {
    props: {
      content: initial,
    },
  };
};

export default Page;
