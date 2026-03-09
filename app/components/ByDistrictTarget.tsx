'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AutoGroupColumnDef, ClientSideRowModelModule, ColDef, ColGroupDef, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import * as custom from '../utils/valueGetters';
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';
import { useSession } from 'next-auth/react'
import { updateDataDistrict, updateDataMFOfromDistrict } from '../actions/updateData';
import ExportButton from './ExportButton';
import { FlagIcon } from '@heroicons/react/16/solid';


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");


interface ResultComponentProps {
  selectedValue: string;
}

const DistrictComponent: React.FC<ResultComponentProps> = ({ selectedValue }) => {

    const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<any[]>([]);

    const handleReturnedFlagged = async (id: any) => {
    let remarks = prompt("Please give your remarks");

    if (remarks == null || remarks == "") {
      alert("You cancelled the flagged")
    } else {
      console.log(remarks);
      const flaggedResponse = await fetch("/api/byDistrict/update2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, col_name: "flagged", value: 1, remarks }),
      });
      const flagged = await flaggedResponse.json();
      if( !flagged){
        alert("Something went wrong.")
      }else{
        alert('Targets successfully flagged')
        const rowNode = gridRef.current?.api?.getRowNode(id);
        if (rowNode) {
          rowNode.setDataValue("flagged", 1);
        }
      }
    }
    
  };

  const handleApprovedFlagged = async (id: any) => {
    const result = window.confirm("Are you sure you want to approve the target?");
    if(result){
      const response = await fetch("/api/byDistrict/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, col_name: "flagged", value: 2, remarks: "" }),
      });
      const json = await response.json();
      if(!json){
        alert("Something went wrong!")
      }else{
        alert("review was successful!")
    const rowNode = gridRef.current?.api?.getRowNode(id);
        if (rowNode) {
          rowNode.setDataValue("flagged", 2);
        }
      
      }
    }
  }

    useEffect(() => {
      let id = Number(selectedValue) 
      fetch(`/api/byDistrict/${id}`) // Fetch data from server
        .then((result) => result.json()) // Convert to JSON
        .then((rowData) => {console.log(rowData.result);setRowData(rowData.result)}); // Update state of `rowData`
   
    }, [selectedValue]);

    const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
      { field: 'mfo_id',  hide: true},
      { field: 'name',  rowGroup: true, hide: true},
      { field: 'province',  rowGroup: true, hide: true},
       {headerName: "Barangay", field: 'barangay', minWidth: 100, editable: false},
      {headerName: "Annual Target", field: 'target', minWidth: 50, editable: false, valueFormatter: custom.currencyFormatter,  cellStyle: custom.customStyleGroupQuarter, aggFunc: 'sum'},
    {headerName: "Cost", field: 'cost', minWidth: 50, valueFormatter: custom.currencyFormatter, cellStyle: custom.customStyleGroupQuarter, aggFunc: 'sum'},
    {headerName: "Group Name", field: 'groups', minWidth: 100},
    {headerName: "Action",  field:"flagged", minWidth: 100, cellRenderer: (params: any) => {
      if (params.node.group) return;
      if (params.data.flagged == 0) return (
        <div className="flex items-start">
          <FlagIcon
            onClick={() => handleReturnedFlagged(params.data.id)}
            className="h-6 w-6 cursor-pointer mx-4 text-red-500 shadow hover:shadow-md mr-1 mb-1 ease-linear transition-all duration-150"
            />
          <FlagIcon
            onClick={() => handleApprovedFlagged(params.data.id)}
            className="h-6 w-6 cursor-pointer mx-4 text-green-500 shadow hover:shadow-md mr-1 mb-1 ease-linear transition-all duration-150"
            />
        </div>
      )
      if (params.data.flagged == 2) return (
        <div className="flex items-start">
           <span className="text-center font-bold text-green-600" >Reviewed</span>
        </div>
      )
      if (params.data.flagged == 1) return (
        <div className="flex items-start">
           <span className="text-center font-bold text-red-600">Flagged</span>
        </div>
      )
  
      },},
       
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
            resizable: true,
            wrapText: true,   
      
          };
        }, []);
      

      const autoGroupColumnDef = useMemo<AutoGroupColumnDef>(() => {
        return {
          headerName: 'MFOs/PAPs',
          pinned: 'left',
          width: 350,
          resizable: true,
          field: "municipal",
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
              suppressCount: true,
              innerRenderer: custom.SimpleCellRenderer,
              //checkbox: false,
          },
          cellClass: ['data'],
          cellClassRules: {"bold": params => params.node.group ? true : false}         
          };
       }, []);

    const onCellValueChanged = async (event: any) => {
      const res = updateDataDistrict(event.data.id, event.colDef.field, event.newValue);
      const res2 = updateDataMFOfromDistrict(event.data.mfo_id, event.colDef.field, event.newValue);
      if(await res2 && await res){
        alert('Data was succesfully updated!');
      }
    };
      

        const getRowId = (params: { data: { id: any; }; }) => params.data.id.toString();
        const rowSelection = useMemo<RowSelectionOptions | "single" | "multiple" >(() => {
            return {
              mode: "singleRow",
              checkboxes: false,
              enableClickSelection: true,
            };
          }, []);
      


  return (
      <div style={{ height: 700, width: '100%' }}>
            <ExportButton gridRef={gridRef} fileName="ByDistrict.xlsx"/>
             <AgGridReact  theme={themeBalham}
             ref={gridRef} // Ref for accessing Grid's API
             getRowId={getRowId}
             rowData={rowData} // Row Data for Rows
             columnDefs={colDefs} // Column Defs for Columns
             defaultColDef={defaultColDef} // Default Column Properties
             animateRows={true} // Optional - set to 'true' to have rows animate when sorted
             groupDefaultExpanded = {-1}
             suppressAggFuncInHeader={true}
      
             rowSelection={rowSelection}
             getRowClass={getRowClass}
            onCellValueChanged={onCellValueChanged}
             autoGroupColumnDef={autoGroupColumnDef}

            suppressGroupRowsSticky={true}
            groupHideParentOfSingleChild ={false}
          
             />
             </div>
  );
};

export default DistrictComponent;