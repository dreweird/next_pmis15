'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ClientSideRowModelModule, ColDef, ColGroupDef, RowSelectionModule, RowSelectionOptions, themeBalham } from 'ag-grid-community';
import {  ExcelExportModule } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import * as custom from '../utils/valueGetters';
import { PivotModule, RowGroupingModule, TreeDataModule, LicenseManager } from 'ag-grid-enterprise';
import { useSession } from 'next-auth/react'
import { updateDataDistrict, updateDataMFOfromDistrict } from '../actions/updateData';
import ExportButton from './ExportButton';


ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule, RowGroupingModule, PivotModule, TreeDataModule, ExcelExportModule, RowSelectionModule]);

LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");


interface ResultComponentProps {
  selectedValue: string;
  locked: any;
}

const DistrictComponent: React.FC<ResultComponentProps> = ({ selectedValue, locked }) => {

    const gridRef = useRef<AgGridReact>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<any[]>([]);
    const { data: session } = useSession()
    const type: number = Number(session?.user?.email); // Only Budget Account can update the budget accomplishment

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
      {headerName: "Groups", field: 'groups', minWidth: 300},
      {headerName: "Annual Target", field: 'target', minWidth: 50, editable: false, valueFormatter: custom.currencyFormatter,  cellStyle: custom.customStyleGroupQuarter, aggFunc: 'sum'},
      {headerName: "Jan", field: 'jan', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[0].locked == 1}, aggFunc: 'sum',},
      {headerName: "Feb", field: 'feb', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[1].locked == 1}, aggFunc: 'sum',},
      {headerName: "Mar", field: 'mar', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[2].locked == 1}, aggFunc: 'sum',},
      {headerName: "Apr", field: 'apr', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[3].locked == 1}, aggFunc: 'sum',},
      {headerName: "May", field: 'may', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[4].locked == 1}, aggFunc: 'sum',},

      {headerName: "Jun", field: 'jun', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[5].locked == 1}, aggFunc: 'sum',},
      {headerName: "Jul", field: 'jul', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[6].locked == 1}, aggFunc: 'sum',},
      {headerName: "Aug", field: 'aug', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[7].locked == 1}, aggFunc: 'sum',},
      {headerName: "Sep", field: 'sep', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[8].locked == 1}, aggFunc: 'sum',},
      {headerName: "Oct", field: 'oct', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[9].locked == 1}, aggFunc: 'sum',},
      {headerName: "Nov", field: 'nov', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[10].locked == 1}, aggFunc: 'sum',},
      {headerName: "Dec", field: 'dece', valueFormatter: custom.currencyFormatter, editable: params => { if (params.node.group) return false;return  locked[11].locked == 1}, aggFunc: 'sum',},
      {headerName: "Total", field: 'total',   valueGetter: custom.total_byDistrict, 
        aggFunc: custom.TotalYearAggFunc, valueFormatter: custom.currencyFormatter, colId: 'grandtotal_district'},
      {headerName: "Accomplishment Rate",    aggFunc: custom.TotalpercentAggFunc,
                valueGetter: custom.percentage_byDistrict,
                valueFormatter: custom.currencyFormatter},
       
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
      

      const autoGroupColumnDef: ColDef = useMemo(() => {
        return {
          headerName: 'MFOs/PAPs',
          pinned: 'left',
          width: 350,
          resizable: true,
          field: "municipal",
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
              suppressCount: true,
          },
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