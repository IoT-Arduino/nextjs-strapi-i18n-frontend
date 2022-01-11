import Link from "next/link";
import { useRouter } from "next/router";

function Page({ content }) {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    console.log(content.localizations[0].id);
    console.log(content.localizations[1].id);
    console.log(content.localizations);
    console.log(locale);

    // localizations.locale の値とlocaleの値が同じオブジェクトのIDを取得する
    const targetId = undefined;
    targetId = content.localizations[1].id;

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

      {/*
      <Link
        href={router.asPath}
        locale={router.locale === "ja-JP" ? "en-US" : "ja-JP"}
      >
        <a>
          {router.locale === "ja-JP" ? "Show English Translation" : "日本語ページへ"}
        </a>
      </Link>
      */}

      <hr />

      <Link href="/">Back to Home</Link>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  // const { locale } = context;

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
