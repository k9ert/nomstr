import { Link } from "react-router-dom";

import React, { useState } from 'react';


const Tag = (props) => {
  const [editing, setEditing] = useState(false);
  const [tagString, setTagString] = useState(
    typeof props.tag === 'string' ? props.tag : props.tag.name
  );

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Save the updated tag here
  };

  return (
    <div className="rounded-lg bg-gray-500 py-0 px-3 m-1 flex items-center">
        {editing ? (
        <input
            className="py-2 px-3 rounded-lg text-sm bg-gray-100 outline-none focus:shadow-outline w-full"
            type="text"
            value={tagString}
            onChange={(e) => setTagString(e.target.value)}
        />
        ) : (
        <Link to={"/tag/" + tagString} className="text-sm">
            <span className="text-white">{tagString}</span>
        </Link>
        )}
        {editing ? (
        <button
            className="text-white text-sm bg-green-500 p-1 rounded-sm mr-2"
            onClick={handleSave}
        >
            Save
        </button>
        ) : (
        <button
            className="text-sm  text-white bg-blue-500 ml-1 p-1 rounded-sm mr-0"
            onClick={handleEdit}
        >
            Edit
        </button>
        )}
    </div>
  );
};

export default Tag;

export { Tag }