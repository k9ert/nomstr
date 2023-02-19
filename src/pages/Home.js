import { useQuery } from '@apollo/client';
import { BookmarkList } from "../components/BookmarkList.js"
import { TagCloud } from '../components/TagCloud';
import { GET_TAGS } from '../queries.js';

const Home = () => {
    const { loading, error, data } = useQuery(GET_TAGS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tags = data.tagResponse.tags

    return (
        <>
            <nav className="flex-col items-center h-screen w-64 bg-gray-300 pt-5 px-2 ">
                <TagCloud tags={tags}/>
            </nav>
            <div className="col-span-5">
                <BookmarkList bookmarks={data.bookmarks}></BookmarkList>
            </div>
        </>


        
    );
}

export {Home}