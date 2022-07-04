import dynamic from 'next/dynamic';

const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

export default function Viewer({ type }) {
    // pdf csv xslx docx Video: mp4, webm Audio: mp3
    //const types = ['csv', 'pdf', 'docx', 'xlsx', 'mp4', 'mp3'];
    const file = `sample.${type}`;
    return (
        <FileViewer fileType={ type } filePath={ `/${file}` } />
    );
};

export async function getStaticPaths() {
    const paths = [
        { params: { type:  'pdf' } },
        { params: { type:  'csv' } },
        { params: { type:  'xlsx' } }, 
        { params: { type:  'docx' } }            
    ]
    return { paths, fallback: false };
}

// dynamic routes - data in props
export function getStaticProps({ params }) {
    return { props: { type: params.type } };
}