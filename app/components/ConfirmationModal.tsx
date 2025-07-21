'use client';
import React from 'react';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const TagDeleteConfirmationModal: React.FC<Props> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fade-in">
        <h2 className="text-lg font-bold text-red-600">Delete Item❗</h2>
        <p className="mt-2 text-gray-700 text-sm">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-transparent hover:underline rounded-lg text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-sm text-xs"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagDeleteConfirmationModal;
