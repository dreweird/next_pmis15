'use client';
import React, { useState, useEffect, useMemo } from 'react';

interface Proposal {
  id: number;
  item: string;
  qty: string;
  enduser: string;
  purpose: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
  initialData?: Proposal | null;
}

const defaultFormData: Proposal = {
  id: 0,
  item: '',
  qty: '',
  enduser: '',
  purpose: '',
};

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  error,
  autoFocus = false,
}: {
  label: string;
  name: keyof Proposal;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoFocus?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={`border-gray-300 focus:border-blue-700 focus:outline-none transition duration-200 w-full p-4 border rounded-sm text-xs ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ProposalFormModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const initialFormData = useMemo(() => initialData || defaultFormData, [initialData]);
  const [form, setForm] = useState<Proposal>(initialFormData);
  const [errors, setErrors] = useState<Record<keyof Proposal, string>>({
    id: '',
    item: '',
    qty: '',
    enduser: '',
    purpose: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  useEffect(() => {
  if (!initialData) {
    setForm(defaultFormData); // Reset form to blank
  } else {
    setForm(initialData);
  }
  setErrors({ id: '', item: '', qty: '', enduser: '', purpose: '' });
}, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]:  name === 'qty'? Number(value): value 
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<keyof Proposal, string> = {
      id: '',
      item: form.item.trim() === '' ? 'Item is required' : '',
      qty:  Number(form.qty) <= 0 ? 'Quantity must be greater than 0' : '',
      enduser: form.enduser.trim() === '' ? 'End-user is required' : '',
      purpose: form.purpose.trim() === '' ? 'Purpose is required' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(msg => msg === '');
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    onSubmit(form);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-200">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg animate-fade-in">
        <h2 className="text-md font-semibold mb-6 mt-2 text-center">
          {initialData ? 'Edit Proposal' : 'Add New Proposal'}
        </h2>

        <div className="space-y-5">
          <InputField
            label="Item"
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="(e.g. Computer Desktop)"
            error={errors.item}
            autoFocus
          />

          <InputField
            label="Quantity"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            placeholder="(e.g. 10)"
            error={errors.qty}
          />

          <InputField
            label="End-User"
            name="enduser"
            value={form.enduser}
            onChange={handleChange}
            placeholder="(e.g. Juan De La Cruz)"
            error={errors.enduser}
          />

          <InputField
            label="Purpose"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="(e.g. Office Productivity)"
            error={errors.purpose}
          />

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={onClose}
              className="text-xs py-2 pr-6 text-gray-500 hover:underline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs text-white bg-blue-600 rounded-sm px-4 py-2 hover:bg-blue-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalFormModal;
