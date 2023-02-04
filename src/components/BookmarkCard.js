import { Card } from '../Lib'
import { Tag } from './Tag'
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from "react-router-dom";



const BookmarkCard = (props) => {

   
    const UPDATE_BOOKMARK_MUTATION = gql`
    mutation MyMutation($url: String!, $tags: [String!]!) {
        updateBookmark(url: $url, tags: $tags)
    }
    `;
    const [updateBookmark, { data, loading, error }] = useMutation(UPDATE_BOOKMARK_MUTATION);
    const [bookmark, setBookmark] = useState({ ...props.bookmark });

    if (loading) return 'Submitting...';
    if (error) return (<Card title={error.message} className="py-7"/>);

    const handleUpdateTag = (oldValue, newValue) => {
        console.log(oldValue + " " + newValue)
        var updatedTags = bookmark.tags.map((t) => ({
                name: t.name === oldValue ? newValue : t.name,
                key: t.name === oldValue ? newValue : t.name
            }));
        console.log(updatedTags)
        setBookmark({ ...bookmark, tags: updatedTags });
        updateBookmark({ variables: { 
            url: bookmark.url, 
            tags: updatedTags.map((t) => t.name )
        } });
        };


    return (
      <Card title={bookmark.title} className="py-7">
        <div className=''>
          <div className=''>
            <Link target={'_blank'} to={bookmark.url}>{bookmark.url}</Link>
          </div>
          <div className=''>
            {bookmark.desc}
          </div>
          <div className='flex justify-center'>
            { 
              bookmark.tags.map((tag) => (
              <Tag 
                key={tag.name} 
                enableEdit={true}
                tag={tag}
                onTagChange={handleUpdateTag}
              />
            ))
  
            }
          </div>
          <div className='text-xs'>
            {bookmark.created_at}
          </div>
        </div>
      </Card>
    )
  }

export {BookmarkCard}