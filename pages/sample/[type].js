// import dynamic from 'next/dynamic';

// const FileViewer = dynamic(() => import('react-file-viewer'), {
//     ssr: false
// });
// export default function Viewer({ type }) {
//     // pdf csv xslx docx Video: mp4, webm Audio: mp3
//     const file = `sample.${type}`;
//     return (
//         <FileViewer fileType={ type } filePath={ `/${file}` } />
//     );
// };

import Layout, { siteTitle } from '../../components/layout';
import MyFileViewer from '../../components/myfileviewer';
import Head from 'next/head';

export default function Viewer({ type }) {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    return (
      <>
        <Head>
          <title>{ siteTitle }</title>
        </Head>
        <MyFileViewer file={ `sample.${type}` } />
      </>
    );
};

export async function getStaticPaths() {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    const supportedTypes = ['csv', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3'];
    const paths = supportedTypes.map(type =>  ({ params: { type } }));
    return { paths, fallback: false };
}

// dynamic routes - data in props
export function getStaticProps({ params }) {
    return { props: { type: params.type } };
}