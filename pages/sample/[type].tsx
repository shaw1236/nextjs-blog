import dynamic from 'next/dynamic';
import { GetStaticProps, GetStaticPaths } from 'next';

const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

export default function Viewer({ type }) {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    const file = `sample.${type}`;
    return (
        <FileViewer fileType ={ type } filePath={ `/${file}` } />
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    const supportedTypes = ['csv', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3'];
    const paths = supportedTypes.map(type =>  ({ params: { type } }));
    return { paths, fallback: false };
}

// dynamic routes - data in props
export const getStaticProps: GetStaticProps = ({ params }) => {
    return { props: { type: params.type } };
}