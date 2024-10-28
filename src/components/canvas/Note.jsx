import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export default function Note({
  id,
  content,
  color: initalColor,
  onRemoveNote,
  onUpdateNote,
}) {
  const [localContent, setLocalContent] = useState(content);

  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const handleContentChange = () => {
    onUpdateNote(id, localContent, color);
  };

  const handleColorChange = newColor => {
    setColor(newColor);
    onUpdateNote(id, content, newColor);
  };

  const [color, setColor] = useState(() => {
    if (initalColor) return initalColor;
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  });
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
            aria-label="Check Note"
            className="text-gray-700"
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
            aria-label="Close Note"
            className="text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        value={localContent}
        ref={textareaRef}
        onChange={e => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />

      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => handleColorChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
