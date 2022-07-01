// https://nextjs.org/learn/basics/assets-metadata-css
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import Layout, { siteTitle } from '../../components/layout';
import Alert from '../../components/alert';

const disableLink = true;
export default function FirstPost() {
  return (
    // This is valid comment
    /* this is also valid */
    //<>
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        {/*<script src="https://connect.facebook.net/en_US/sdk.js" />*/}
      </Head>       
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad = {() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      {disableLink? (
        <h1>My First Post</h1>
      ) : 
      (<Link href="/">
        <a><h1>My First Post</h1></a>
      </Link>
      // <h2>
      //   <Link href="/">
      //     <a>Back to home</a>
      //   </Link>
      // </h2> 
      )}
      <Alert>This is a default success</Alert>
      <Alert type="warning">This is a warning</Alert>
      <Alert type="error">This is an error!</Alert>
    </Layout>
    //</>
    // this is also a valid comment
    /* this is also valid */ 
  );
}