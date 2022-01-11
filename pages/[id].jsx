import Link from "next/link";
import { useRouter } from "next/router";

function Page({ content }) {
  const router = useRouter();


  return (
    <div className="container">
      <h2>{content.title}</h2>

      <div className="body">{content.body}</div>

      <hr />
      <hr />
      <Link
        href={router.asPath}
        // href={`/${content.localizations[0].id}`}
        locale={router.locale === "ja-JP" ? "en-US" : "ja-JP"}
      >
        <a>
          {router.locale === "ja-JP" ? "Show English Translation" : "日本語"}
        </a>
      </Link>
      <div>{router.locale}</div>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { locale } = context;

  console.log(context)

  let translation = undefined;

  const initialRes = await fetch(`http://localhost:1337/pages/${id}`);
  const initial = await initialRes.json();

  if (locale === "en-US") {
    const translationRes = await fetch(
      `http://localhost:1337/pages/${initial.localizations[0].id}`
    );
    const translation = await translationRes.json();
  }

  return {
    props: {
      content: translation ? translationn : initial,
    },
  };
};

export default Page;
