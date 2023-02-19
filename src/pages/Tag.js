import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card } from "../Lib.js"
import { TagCloud } from '../components/TagCloud.js';
import { BookmarkList } from '../components/BookmarkList.js';
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
        <>
            <nav className="flex-col items-center h-screen w-64 bg-gray-300 pt-5 px-2 ">
                <Card>
                    <Tag tag={tag}/>
                </Card>
                
                <TagCloud tags={data.tagResponse.tags}/>
            </nav>
            <div className="col-span-5 flex bg-gray-300 pt-5 px-2">
                <BookmarkList tag={tag}></BookmarkList>
            </div>
        </>
    );
}

export {TagPage as Tag}