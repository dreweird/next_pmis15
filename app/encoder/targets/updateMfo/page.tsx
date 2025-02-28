"use client";

import { TrashIcon } from '@heroicons/react/16/solid';
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule,  PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { updateData } from '@/app/actions/updateData';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");
 

const page = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [rowData, setRowData] = useState<any[]>([]);
   const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API

  useEffect(() => {
      fetch("/api/mfo/list") // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => setRowData(rowData.result));
      
    }, []);

    if (status === 2) {
      return <div className='text-red-500'>Unable to update MFO target  because your targets were already verified!</div>;
    }

    const handleDeleteData = async (id: any) => {
      const result = window.confirm("Are you sure you want to delete the data?");
     if(result){
      const response = await fetch("/api/mfo/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const json = await response.json();
      if(!json.success){
        alert(json.message)
      }else{
        alert("delete was successful!")
        if (gridRef.current) {
          var selectedRowData = gridRef.current.api.getSelectedRows();
          gridRef.current.api.applyTransaction({ remove: selectedRowData });
        }
      }
     }
    };

  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([

      { field: 'h1',  rowGroup: true, hide: false, editable: true},
      { field: 'h2',  rowGroup: true, hide: false, editable: true},
      { field: 'h3',  rowGroup: true, hide: false, editable: true},
      { field: 'h4',  rowGroup: true, hide: false, editable: true},
  
    
      {headerName: "MFO Name", field: 'name',  editable: true},
      {headerName: "Unit Measure", field: 'unit',  editable: true},
      {headerName: "Maintenance", field: 'main',  editable: true, width: 20},
      {headerName: "Area", field: 'area',  editable: true, width: 20},
  
      {headerName:"Actions", field: "Actions",minWidth: 100,
      cellRenderer: (params: { node: { group: any; }; data: { mfo_id: any; }; }) => {
        if (params.node.group) return;
          return (
            <div className="flex items-start">
              <TrashIcon
                onClick={() => handleDeleteData(params.data.mfo_id)}
                className="h-6 w-6 cursor-pointer mx-4 text-red-500 shadow hover:shadow-md mr-1 mb-1 ease-linear transition-all duration-150"
                />
            </div>
            );      
        },
      },
  
  
    ]);

  const getRowClass = (params: { node: { group: any; }; }) => {
          if (params.node.group) {
              return 'group-header';
          }
      };
      
const defaultColDef = useMemo(() => {
      return {
        sortable: true,
        flex: 1,
        floatingFilter: true,
        resizable: true,
        wrapText: true,   
        autoHeight: true,   
        wrapHeaderText: true,
        autoHeaderHeight: true,
  
      };
    }, []);

const autoGroupColumnDef: ColDef = useMemo(() => {
    return {
          headerName: 'MFOs/PAPs',
          pinned: 'left',
          width: 350,
          resizable: true,
          field: "name",
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
              suppressCount: true,      
          }
      };
  }, []);

  const onCellValueChanged = async (event: any) => {
    const res = updateData(event.data.mfo_id, event.colDef.field, event.newValue);
    if(await res){
      alert('Data was succesfully updated!');
    }

  };

   const getRowId = (params: { data: { mfo_id: any; }; }) => params.data.mfo_id.toString();
   const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple" >(() => {
      return {
        mode: "singleRow",
        checkboxes: false,
        enableClickSelection: true,
      };
    }, []);




  return (  
    <div style={{ height: 700, width: '100%' }}>
    <AgGridReact  theme={themeBalham}
      ref={gridRef} // Ref for accessing Grid's API
      getRowId={getRowId}
      rowData={rowData} // Row Data for Rows
      columnDefs={colDefs} // Column Defs for Columns
      defaultColDef={defaultColDef} // Default Column Properties
    //  animateRows={true} // Optional - set to 'true' to have rows animate when sorted
      groupDefaultExpanded = {-1}

      suppressAggFuncInHeader={true}

      rowSelection={rowSelection}
      getRowClass={getRowClass}
      onCellValueChanged={onCellValueChanged}
      autoGroupColumnDef={autoGroupColumnDef}
     // groupDisplayType={"singleColumn"}
     // showOpenedGroup={true}
     suppressGroupRowsSticky={true}
     groupHideParentOfSingleChild ={true} 

    />
  </div>

  )
}

export default page