import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';

import utilStyles from '../../styles/utils.module.css';

// dynamic routes - UI
export default function Post({ postData }) {
    return (
      <Layout>
        {/* Add this <Head> tag */}
        <Head>
          <title>{ postData.title }</title>
        </Head>

        <article>
            <h2 className={ utilStyles.headingXl }>{ postData.title }</h2>
            <div className={ utilStyles.lightText }>
               <Date dateString={ postData.date } />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
}

// dynamic routes - path 
//In development (npm run dev or yarn dev), getStaticPaths runs on every request.
//In production, getStaticPaths runs at build time.
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return { paths, fallback: false };
}

// dynamic routes - data in props
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return { props: { postData } };
}