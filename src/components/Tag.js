import { Link } from "react-router-dom";

import React, { useState } from 'react';


const Tag = (props) => {
  const [editing, setEditing] = useState(false);
  const [tag, setTag] = useState({ ...props.tag });
  const [newTag, setNewTag] = useState({ ...props.tag });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    props.onTagChange(tag.name, newTag.name); // Call the callback function passed from the parent component
    setTag({ name: newTag.name});
  };

  return (
    <div key={tag.name} className="rounded-lg bg-gray-500 py-0 px-3 m-1 flex items-center">
        {editing ? (
        <input
            className="py-2 px-3 rounded-lg text-sm bg-gray-100 outline-none focus:shadow-outline w-full"
            type="text"
            value={newTag.name}
            onChange={(e) => setNewTag({ ...tag, name: e.target.value })}
        />
        ) : (
        <Link to={"/tag/" + tag.name} className="text-sm">
            <span className="text-white">{tag.name}</span>
        </Link>
        )}
        {props.enableEdit && (
          <>
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
          </>
        )}
    </div>
  );
};

export { Tag }