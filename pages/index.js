// https://nextjs.org/learn/basics/api-routes
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }) {
  const [ docType, setDocType ] = useState("pdf");
  return (
    //<Layout home="1"> -- home: "1" 
    //<Layout home> -- home: true
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I&#39;m Simon, a Web Development Lead, senior software engineer, full stack web developer &amp; database expert</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <Link href="/posts/first-post">
          <a>This is first post page - routing sample</a>
        </Link>
        <br/>
        <Link href={`/sample/${docType}`}>
          <a>View sample document {' '}</a>
        </Link> 
        <select value={docType} onChange={(e) => { setDocType(e.target.value) }} title='select file type'>
          <option value="pdf">pdf</option>
          <option value="csv">csv</option>
          <option value="docx">docx</option>
          <option value="xlsx">xlsx</option>
        </select>
        <br/> 
        <Link href={`/api/ping`}>
          <a>my public ip address or any other ip via /api/ping?ip=IPAddress</a>
        </Link>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

/**
 * Static Generation with Data using getStaticProps - runs at build time in production
 * In development mode, getStaticProps runs on each request instead.
*/
// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.
//   const data = ...;

//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: ...
//   }
// }
// getStaticProps can only be exported from a page. You can’t export it from non-page files.
// getStaticProps only runs on the server-side. It will never run on the client-side
import { getSortedPostsData } from '../lib/posts';
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const allPostsData = getSortedPostsData();

  // The value of the `props` key will be passed to the `Home` component
  return { props: { allPostsData } };
}

// Server-side rendering
// called at request time
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }