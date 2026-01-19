'use client';

import { useState, useEffect, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ColDef, PaginationModule } from 'ag-grid-community';
import {
  ClientSideRowModelModule,
  ValidationModule
} from 'ag-grid-community';
import ProposalFormModal from './PopUp';
import TagDeleteConfirmationModal from './ConfirmationModal';

import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { json } from 'stream/consumers';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule
]);

interface Proposal {
  id: number;
  item: string;
  qty: string;
  enduser: string;
  purpose: string;
}

const ProposalTable = () => {
  const [data, setData] = useState<Proposal[]>([]);
  const [colDefs] = useState<ColDef[]>([ {
      headerName: 'Item',
      field: 'item',
      width: 200,
      headerClass: 'bg-gray-100 font-semibold',
    }, {
      headerName: 'Quantity',
      field: 'qty',
      width: 150,
      headerClass: 'bg-gray-100 font-semibold',
    }, {
      headerName: 'End-User',
      field: 'enduser',
      width: 150,
      headerClass: 'bg-gray-100 font-semibold',
    }, {
      headerName: 'Purpose',
      field: 'purpose',
      flex: 2,
      width: 250,
      headerClass: 'bg-gray-100 font-semibold text-gray-700',
    }, {
      headerName: 'User',
      field: 'first_name',
      width: 150,
      headerClass: 'bg-gray-100 font-semibold text-gray-700',
    }, {
      headerName: 'Actions',
      field: 'actions',
      width: 180,
      headerClass: 'bg-gray-100 font-semibold text-gray-700',
      cellRenderer: (params: any) => (
        <div className="flex gap-2 justify-center">
          <button
            className="bg-transparent hover:text-gray-400 hover:underline text-gray-500 px-3 py-2 text-xs"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </button>
          <button
            className="bg-transparent hover:text-red-400 hover:underline text-red-500 px-2 py-2 rounded-sm text-xs"
            onClick={() => confirmDelete(params.data)}
          >
           Delete
          </button>
        </div>
      )
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/proposal/list');
      const json = await res.json();
      console.log(res)
      setData(json.result);
    } catch (err) {
      console.error('Error fetching proposals:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = () => {
    setEditingProposal(null)
    setIsModalOpen(true);
  };

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsModalOpen(true);
  };

  const confirmDelete = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedProposal) return;
    try {
      await fetch('/api/proposal/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedProposal.id }),
      });
      fetchData();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setShowDeleteModal(false);
      setSelectedProposal(null);
      setIsModalOpen(false)
    }
  };

  const handleSave = async (proposal: Proposal) => {
    const isUpdate = Boolean(editingProposal);
    const method = isUpdate ? 'PUT' : 'POST';
    const url = isUpdate ? '/api/proposal/update' : '/api/proposal/add';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposal),
      });
      await res.json();
      fetchData();
    } catch (err) {
      console.error(`${isUpdate ? 'Update' : 'Add'} failed:`, err);
    } finally {
      // setIsModalOpen(false);
    }
  };

  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 20, 50, 100];

  return (
    <>
      <ProposalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingProposal}
      />

      <TagDeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-xl border border-gray-200 rounded-xl transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                List of ICT Proposal for 2027
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                View and manage proposal entries below.
              </p>
              <p className="text-xs text-red-500 dark:text-gray-400 mt-1">
                Please input your ICT Proposal for 2027 not later than September 30, 2025.
              </p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-xs"
              onClick={handleAdd}
            >
              + Add Proposal
            </button>
          </div>

          <div className="ag-theme-quartz w-full" style={{ height: 480 }}>
            {data.length > 0 ? (
              <AgGridReact<Proposal> 
                  rowData={data} 
                  columnDefs={colDefs} 
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={paginationPageSizeSelector}
                  />
            ) : (
              <p className="text-center text-gray-500 mt-4">No data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalTable;