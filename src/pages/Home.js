import { useQuery } from '@apollo/client';
import { LinkList } from "../Lib.js"
import { TagCloud } from '../components/TagCloud';
import { GET_BOOKMARKS } from '../queries.js';

const Home = () => {
    const { loading, error, data } = useQuery(GET_BOOKMARKS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tags = data.tags

    return (
        <div className='grid grid-cols-6'>
            <nav className="col-span-1 flex flex-col items-center bg-gray-300 pt-5 px-2 ">
            <TagCloud tags={tags}/>
            </nav>
            <LinkList bookmarks={data.bookmarks}></LinkList>
        </div>
    );
}

export {Home}