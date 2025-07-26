import React from 'react';

const Card = ({ name, role, description, onEdit, onDelete }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 mb-4">
      <div className="flex-1">
        <h5 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {description}
        </p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;