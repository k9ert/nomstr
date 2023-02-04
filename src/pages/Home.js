import { useQuery, gql } from '@apollo/client';
import { TopNavBar, TagCloud, extractTags, LinkList, Alert } from "../Lib.js"

const GET_BOOKMARKS = gql`
  query Bookmarks {
    bookmarks {
      readlater
      annotations
      tags
      comments
      user
      shared
      url
      createdAt
      desc
      updatedAt
      title
    }
  }
`;

const Home = () => {
    const { loading, error, data } = useQuery(GET_BOOKMARKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tags = extractTags(data.bookmarks)

    return (
        <div className='grid grid-cols-6'>
            <nav class="col-span-1 flex flex-col items-center h-screen w-64 bg-gray-300 pt-5 px-2 ">
            <TagCloud tags={tags}/>
            </nav>
            <LinkList bookmarks={data.bookmarks}></LinkList>
        </div>
    );
}

export {Home}