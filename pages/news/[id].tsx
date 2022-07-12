import Layout from "../../components/Layout";

import { API_URL } from "../../config/index";

function Page({ content }) {

  return (
    <Layout title={content.title} content={content}>
      <h2>{content.title}</h2>
      <div className="body">{content.body}</div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const initialRes = await fetch(`${API_URL}/pages/${id}`);
  const initial = await initialRes.json();

  return {
    props: {
      content: initial,
    },
  };
};

export default Page;
