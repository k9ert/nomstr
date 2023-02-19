import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BookmarkCard } from './BookmarkCard'
import Pagination from './Pagination'
import { GET_BOOKMARKS } from '../queries.js';

const BookmarkList = (props) => {
    const tag = props.tag
    const [pageSize, setPageSize] = useState(20);
    const [after, setAfter] = useState(0);

    const handlePageChange = (newPage, resultsPerPage) => {
        newPage = newPage < 0 ? 0 : newPage
        setPageSize(resultsPerPage)
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
    const currentPage = Math.ceil(after / pageSize)

    return (
        <div className='col-span-5'>
          Page {currentPage} from {totalPages} (after = {after})
          <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange}/>
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.url} bookmark={bookmark}/>
          ))
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={handlePageChange}/>
        </div>

    )
}

export {BookmarkList}