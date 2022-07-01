import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts'); // ./posts

// fetches data from the file system
export function getSortedPostsData() {
    try { 
        // Get file names under /posts
        const fileNames = fs.readdirSync(postsDirectory); // read all files
        //console.log("fileNames:", fileNames);
        const allPostsData = fileNames.map(fileName => {
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            //console.log("file name: ", fullPath);
            const fileContents = fs.readFileSync(fullPath, 'utf-8');
            //console.log("fileContents:", fileContents);
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);
            //console.log("matterResult.data: ", matterResult.data);
            // Combine the data with the id
            return { id, ...matterResult.data };
        });

        //return allPostsData;
        // Sort posts by date
        return allPostsData.sort(({ date: a }, { date: b }) => a < b? 1 : a > b? -1 : 0);
    }
    catch(ex) {
        console.error("[getSortedPostsData] ex", ex.message || ex);
        return [];
    }
}

// fetches data from api
// Note: Next.js polyfills fetch() on both the client and server. no need to import it.
export async function getSortedPostsDataViaAPI() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..');
    return res.json();
}

// fetches data from database
// !! getStaticProps only runs on the server-side. It will never run on the client-side.
// import someDatabaseSDK from 'someDatabaseSDK'
// const databaseClient = someDatabaseSDK.createClient(...)
// export async function getSortedPostsDataViaDB() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }

// Dynamic routing
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getAllPostIdsApi() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..');
    const posts = await res.json();
    return posts.map(post => ({ params: { id: post.id } }));
}

// Get data from file
export function getPostDataFromFile(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Combine the data with the id
    return { id, ...matterResult.data };
}

// render markdown content
import { remark } from 'remark';
import html from 'remark-html';
export async function getPostData(id, useMarkdown = true) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    let result = { id, ...matterResult.data };
    if (useMarkdown) {
        // Use remark to convert markdown into HTML string
        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();
  
        // Combine the data with the id and contentHtml
        result = { ...result, contentHtml };
    }
    return result;
  }