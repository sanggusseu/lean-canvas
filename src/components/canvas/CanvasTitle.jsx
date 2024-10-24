import { useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

export default function CanvasTitle() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Lean Canvas');
  const [editingTitle, setEditingTitle] = useState(title);

  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleTitleChange = e => setEditingTitle(e.target.value);

  const handleTitleSubmit = () => {
    setTitle(editingTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editingTitle}
            onChange={handleTitleChange}
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handleTitleSubmit}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={handleEditTitle}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}