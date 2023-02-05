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
    const [newTag, setNewTag] = useState("");

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

    const handleAddTag = () => {
        const updatedTags = [...bookmark.tags, { name: newTag, key: newTag, editMode:true }];
        setBookmark({ ...bookmark, tags: updatedTags });
        updateBookmark({
        variables: {
            url: bookmark.url,
            tags: updatedTags.map((t) => t.name),
        },
        });
        setNewTag("");
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
                editMode={tag.editMode}
                tag={tag}
                onTagChange={handleUpdateTag}
              />
            ))
  
            }
            <button className="ml-3 bg-green-500 rounded-full hover:bg-gray-400 p-2" 
                    onClick={ () => {
                        handleAddTag("");
                        setNewTag("");
                    }}
            >
            <span className="text-gray-100">+</span>
            </button>
          </div>        
          <div className='text-xs'>
            {bookmark.created_at}
          </div>
        </div>
      </Card>
    )
  }

export {BookmarkCard}