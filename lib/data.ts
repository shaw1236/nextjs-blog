export interface IPostsData {
    date: string;
    title: string;
    id?: string;
    contentHtml?: string
}
  
export type IPostsList = IPostsData[]; 
