import dynamic from 'next/dynamic';

const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

export default function Viewer({ type }) {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    const file = `sample.${type}`;
    return (
        <FileViewer fileType={ type } filePath={ `/${file}` } />
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