import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LinkList, Card } from "../Lib.js"
import { TagCloud } from '../components/TagCloud.js';
import { Tag } from "../components/Tag"
import { GET_BOOKMARKS } from "../queries"

const TagPage = (props) => {
    const { tag } = useParams();

    const { loading, error, data } = useQuery(
        GET_BOOKMARKS, {
            variables: { tag: tag }
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div className='grid grid-cols-6'>
            <nav className="col-span-1 flex flex-col items-center h-screen w-64 bg-gray-300 pt-5 px-2 ">
            <Card>
                <Tag tag={tag}/>
            </Card>
            
            <TagCloud tags={data.tags}/>
            </nav>
            <LinkList bookmarks={data.bookmarks}></LinkList>
        </div>
    );
}

export {TagPage as Tag}