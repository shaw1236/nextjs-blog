import path from 'path';
import dynamic from 'next/dynamic';

const FileViewer = dynamic(() => import('react-file-viewer'), {
    ssr: false
});

// The file is always placed under 'public' folder
export default function MyFileViewer({ file }) {
    // file type: ["pdf", "csv", "xslx", "docx". "mp4", "mp3"]
    //const [ type ] = file.split('.').slice(-1);
    const objFile = path.parse(file);
    return (
        <FileViewer fileType={objFile.ext.slice(1)} filePath={`/${objFile.base}`} />
    );
};