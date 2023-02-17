import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BookmarkCard } from './BookmarkCard'
import Pagination from './Pagination'
import { GET_BOOKMARKS } from '../queries.js';

const BookmarkList = (props) => {
    const tag = props.tag
    const pageSize = 20
    
    const [after, setAfter] = useState(0);

    const handlePageChange = (newPage) => {
        newPage = newPage < 0 ? 0 : newPage
        setAfter(newPage*pageSize);
    };
    const { loading, error, data } = useQuery(
        GET_BOOKMARKS, {
            variables: { tag: tag, first:pageSize, after: after }
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const bookmarks = data.bookmarks.bookmarks
    const pageMeta = data.bookmarks.pageMeta
    const totalPages = Math.ceil(pageMeta.maxCursor / pageSize)
    const currentPage = after / pageSize

    return (
        <div className='col-span-5'>
          Page {currentPage} from {totalPages} (after = {after})
          <Pagination currentPage="0" totalPages={totalPages} onPageChange={handlePageChange}/>
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.url} bookmark={bookmark}/>
          ))
          }
          <Pagination currentPage="0" totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>

    )
}

export {BookmarkList}