import React, { useState, useRef, useEffect} from 'react';
import { CREATE_BOOKMARK_MUTATION, GET_BOOKMARKS } from '../queries';
import { Card } from '../Lib';
import { useMutation } from '@apollo/client';

const AddBookmarkOverlay = () => {
  const [createBookmark, { data, loading, error}] = useMutation(CREATE_BOOKMARK_MUTATION,
        {
            refetchQueries: [
                {query: GET_BOOKMARKS},
                'Bookmarks'
            ]

        }
        );
  const [showOverlay, setShowOverlay] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const overlayRef = useRef(null);
  const buttonRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && !overlayRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [overlayRef]);

  if (loading) return 'Submitting...';
  if (error) return (<Card title={error.message} className="py-7"/>);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submit action here (e.g. sending the data to a server, or storing it locally)
    const tagList = tags.split(" ")
    createBookmark({ variables: { url, title, desc, tags: tagList } });
    setShowOverlay(false);
    setUrl('');
    setTitle('');
    setTags('');
  };

  const overlayStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    border: "1px solid gray",
    padding: "20px",

  };

  const buttonBottomRightStyles = {
    position: "fixed",
    bottom: "40px",
    right: "40px",
  }
  
  return (
    <div>
      <div className="fixed-bottom-right" style={buttonBottomRightStyles}>
        <button
          className="bg-green-500 hover:bg-green-400 text-white text-l font-bold py-6 px-8 rounded-full"
          onClick={() => setShowOverlay(!showOverlay)}
          ref={buttonRef}
        >
          <span className="text-xl">+</span>
        </button>
      </div>

      {showOverlay && (
        <div className="overlay bg-transparent bg-slate-400" style={overlayStyles} ref={overlayRef}>
          <div className="bg-gray-500 p-6 rounded-lg shadow-2xl">
            <h2 className="text-lg font-medium mb-4">Add a Bookmark</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="url">
                  URL
                </label>
                <input
                  type="text"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Description
                </label>
                <input
                  type="text"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="desc"
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="tags">
                  Tags
                </label>
                <input
                  type="text"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="title"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                />
               </div>
               <div className="flex items-center justify-end">
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                Submit
                </button>
                </div>
            </form>
        </div></div> 
      )}
      
      </div>    
      ) 
}

export { AddBookmarkOverlay }