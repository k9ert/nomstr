import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Pagination from './Pagination'
import { GET_TAGS } from '../queries.js';
import { TagCard } from '../components/TagCard'

const TagList = (props) => {
    const tag = props.tag
    const [pageSize, setPageSize] = useState(20);
    const [after, setAfter] = useState(0);
    const [minCount, setMinCount] = useState(0);

    const handlePageChange = (newPage, resultsPerPage) => {
        newPage = newPage < 0 ? 0 : newPage
        setPageSize(resultsPerPage)
        setAfter(newPage*pageSize);
    };

    const handleSliderChange = (newMinCount) => {
        setAfter(0)
        setMinCount(newMinCount)
    }

    const { loading, error, data } = useQuery(
        GET_TAGS, {
            variables: { tag: tag, first:pageSize, after: after, minCount: minCount }
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const tags = data.tagResponse.tags
    const pageMeta = data.tagResponse.pageMeta
    const totalPages = Math.ceil(pageMeta.maxCursor / pageSize)
    const currentPage = Math.ceil(after / pageSize)

    return (
        <div className='col-span-5'>
          Page {currentPage} from {totalPages} (after = {after} results={pageMeta.resultCount})
          <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} 
                onPageChange={handlePageChange} slider={true} onSliderChange={handleSliderChange} sliderValueProps={minCount}/>
          {tags.map((tag) => (
            <TagCard key={tag.name} tag={tag}/>
          ))
          }
          <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} 
                onPageChange={handlePageChange} slider={true} onSliderChange={handleSliderChange} sliderValueProps={minCount}/>
        </div>

    )
}

export {TagList}